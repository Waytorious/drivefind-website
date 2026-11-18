import json
import os
import secrets
import time
from typing import Optional

from fastapi import Depends, FastAPI, Header, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from database import get_db_connection, hash_password, init_db, verify_password

app = FastAPI(title="DriveFind API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def no_cache_static(request, call_next):
    raw_len = request.headers.get("content-length") or "0"
    if raw_len.isdigit() and int(raw_len) > 16384:
        from fastapi.responses import JSONResponse
        return JSONResponse({"detail": "Запрос слишком большой"}, status_code=413)
    response = await call_next(request)
    if not request.url.path.startswith("/images/"):
        response.headers.setdefault("Cache-Control", "no-cache")
    return response

EMAIL_REGEX = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"
RATE_BUCKETS: dict[str, list[float]] = {}
_CARS_CACHE: list[dict] = []
SORT_SQL = {
    "price_asc": "price ASC",
    "price_desc": "price DESC",
    "year_desc": "year DESC",
    "mileage_asc": "mileage ASC",
}


def check_rate_limit(key: str, limit: int, window: int = 60, record: bool = True):
    now = time.monotonic()
    hits = [t for t in RATE_BUCKETS.get(key, []) if now - t < window]
    if len(hits) >= limit:
        raise HTTPException(status_code=429, detail="Слишком много запросов, попробуйте через минуту")
    if record:
        hits.append(now)
    RATE_BUCKETS[key] = hits


class UserRegisterRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: str = Field(..., max_length=100, pattern=EMAIL_REGEX)
    password: str = Field(..., min_length=6, max_length=100)


class UserLoginRequest(BaseModel):
    username: str = Field(..., max_length=100)
    password: str = Field(..., max_length=100)


class InquiryRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: str = Field(..., max_length=100, pattern=EMAIL_REGEX)
    phone: Optional[str] = Field(None, max_length=100)
    message: str = Field(..., min_length=5, max_length=500)
    car_id: Optional[int] = None


def extract_token(authorization: Optional[str]) -> Optional[str]:
    if not authorization:
        return None
    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        return None
    return parts[1]


def row_to_car(row) -> dict:
    car = dict(row)
    try:
        car["gallery"] = json.loads(car.get("gallery_json") or "") or [car["image_url"]]
    except Exception:
        car["gallery"] = [car["image_url"]]
    return car


def create_session(cursor, user_id: int) -> str:
    cursor.execute(
        """DELETE FROM sessions WHERE user_id = ? AND token NOT IN (
               SELECT token FROM sessions WHERE user_id = ? ORDER BY created_at DESC, rowid DESC LIMIT 9
           )""",
        (user_id, user_id),
    )
    token = secrets.token_hex(32)
    cursor.execute("INSERT INTO sessions (token, user_id) VALUES (?, ?)", (token, user_id))
    return token


def get_current_user(authorization: Optional[str] = Header(None)):
    """Получение пользователя по токену Bearer из таблицы sessions."""
    token = extract_token(authorization)
    if not token:
        raise HTTPException(status_code=401, detail="Требуется авторизация")

    conn = get_db_connection()
    user = conn.execute(
        """SELECT users.id, users.username, users.email, users.created_at
           FROM users JOIN sessions ON users.id = sessions.user_id
           WHERE sessions.token = ?""",
        (token,),
    ).fetchone()
    conn.close()

    if not user:
        raise HTTPException(status_code=401, detail="Недействительная или устаревшая сессия")
    return dict(user)


def get_optional_user(authorization: Optional[str] = Header(None)) -> Optional[dict]:
    try:
        return get_current_user(authorization) if authorization else None
    except HTTPException:
        return None


@app.on_event("startup")
def on_startup():
    init_db()


@app.get("/api/health")
def health_check():
    return {"status": "ok", "app": "DriveFind API v1.0"}


@app.get("/api/cars")
def get_cars(
    max_price: Optional[float] = Query(None),
    min_year: Optional[int] = Query(None),
    max_mileage: Optional[int] = Query(None),
    search: Optional[str] = Query(None),
    sort: Optional[str] = Query("default"),
):
    is_default = (
        max_price is None and min_year is None and max_mileage is None
        and not search and sort in (None, "default")
    )
    if is_default and _CARS_CACHE:
        return _CARS_CACHE

    sql = "SELECT * FROM cars WHERE 1=1"
    params = []

    if max_price is not None and max_price > 0:
        sql += " AND price <= ?"
        params.append(max_price)
    if min_year is not None and min_year > 0:
        sql += " AND year >= ?"
        params.append(min_year)
    if max_mileage is not None and max_mileage >= 0:
        sql += " AND mileage <= ?"
        params.append(max_mileage)
    if search:
        term = f"%{search.strip()}%"
        sql += " AND (brand LIKE ? OR model LIKE ?)"
        params.extend([term, term])

    sql += " ORDER BY " + SORT_SQL.get(sort, "id ASC")

    conn = get_db_connection()
    rows = conn.execute(sql, params).fetchall()
    conn.close()
    cars = [row_to_car(r) for r in rows]
    if is_default:
        _CARS_CACHE.extend(cars)
    return cars


@app.get("/api/cars/{car_id}")
def get_car_by_id(car_id: int):
    if _CARS_CACHE:
        cached = next((c for c in _CARS_CACHE if c["id"] == car_id), None)
        if cached:
            return cached
        raise HTTPException(status_code=404, detail="Автомобиль не найден")
    conn = get_db_connection()
    row = conn.execute("SELECT * FROM cars WHERE id = ?", (car_id,)).fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Автомобиль не найден")
    return row_to_car(row)


@app.post("/api/auth/register", status_code=status.HTTP_201_CREATED)
def register(data: UserRegisterRequest):
    check_rate_limit("register", limit=3, window=60)
    conn = get_db_connection()
    cursor = conn.cursor()

    if cursor.execute("SELECT COUNT(*) FROM users").fetchone()[0] >= 100:
        conn.close()
        raise HTTPException(status_code=429, detail="Регистрация временно ограничена")
    if cursor.execute("SELECT id FROM users WHERE username = ?", (data.username,)).fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="Пользователь с таким логином уже существует")
    if cursor.execute("SELECT id FROM users WHERE email = ?", (data.email,)).fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="Пользователь с таким email уже существует")

    cursor.execute(
        "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
        (data.username, data.email, hash_password(data.password)),
    )
    user_id = cursor.lastrowid
    token = create_session(cursor, user_id)
    conn.commit()
    conn.close()

    return {
        "message": "Регистрация прошла успешно",
        "token": token,
        "user": {"id": user_id, "username": data.username, "email": data.email},
    }


@app.post("/api/auth/login")
def login(data: UserLoginRequest):
    fail_key = f"login_fail:{data.username.strip().lower()}"
    check_rate_limit(fail_key, limit=5, window=60, record=False)
    check_rate_limit("login_fail_global", limit=20, window=60, record=False)
    conn = get_db_connection()
    cursor = conn.cursor()
    user = cursor.execute("SELECT * FROM users WHERE username = ?", (data.username,)).fetchone()

    if not user or not verify_password(data.password, user["password_hash"]):
        conn.close()
        check_rate_limit(fail_key, limit=5, window=60, record=True)
        check_rate_limit("login_fail_global", limit=20, window=60, record=True)
        raise HTTPException(status_code=401, detail="Неверное имя пользователя или пароль")

    token = create_session(cursor, user["id"])
    conn.commit()
    conn.close()

    return {
        "message": "Успешный вход",
        "token": token,
        "user": {"id": user["id"], "username": user["username"], "email": user["email"]},
    }


@app.get("/api/auth/me")
def get_me(current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    row = conn.execute("SELECT COUNT(*) as c FROM favorites WHERE user_id = ?", (current_user["id"],)).fetchone()
    conn.close()
    return {**current_user, "favorites_count": row["c"] if row else 0}


@app.post("/api/auth/logout")
def logout(authorization: Optional[str] = Header(None)):
    token = extract_token(authorization)
    if token:
        conn = get_db_connection()
        conn.execute("DELETE FROM sessions WHERE token = ?", (token,))
        conn.commit()
        conn.close()
    return {"message": "Успешный выход"}


@app.get("/api/favorites")
def get_favorites(current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    rows = conn.execute(
        """SELECT cars.* FROM cars
           JOIN favorites ON cars.id = favorites.car_id
           WHERE favorites.user_id = ?
           ORDER BY favorites.created_at DESC""",
        (current_user["id"],),
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]


@app.post("/api/favorites/{car_id}")
def add_favorite(car_id: int, current_user: dict = Depends(get_current_user)):
    check_rate_limit(f"fav:{current_user['id']}", limit=30, window=60)
    conn = get_db_connection()
    if not conn.execute("SELECT id FROM cars WHERE id = ?", (car_id,)).fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="Автомобиль не найден")

    conn.execute("INSERT OR IGNORE INTO favorites (user_id, car_id) VALUES (?, ?)", (current_user["id"], car_id))
    conn.commit()
    conn.close()
    return {"message": "Автомобиль добавлен в избранное"}


@app.delete("/api/favorites/{car_id}")
def remove_favorite(car_id: int, current_user: dict = Depends(get_current_user)):
    check_rate_limit(f"fav:{current_user['id']}", limit=30, window=60)
    conn = get_db_connection()
    conn.execute("DELETE FROM favorites WHERE user_id = ? AND car_id = ?", (current_user["id"], car_id))
    conn.commit()
    conn.close()
    return {"message": "Автомобиль удален из избранного"}


@app.post("/api/inquiries", status_code=status.HTTP_201_CREATED)
def submit_inquiry(inquiry: InquiryRequest, current_user: Optional[dict] = Depends(get_optional_user)):
    check_rate_limit("inquiries", limit=5, window=60)
    user_id = current_user["id"] if current_user else None
    conn = get_db_connection()
    cursor = conn.cursor()
    if cursor.execute("SELECT COUNT(*) FROM inquiries").fetchone()[0] >= 100:
        conn.close()
        raise HTTPException(status_code=429, detail="Прием заявок временно ограничен")
    cursor.execute(
        """INSERT INTO inquiries (user_id, car_id, name, email, phone, message)
           VALUES (?, ?, ?, ?, ?, ?)""",
        (user_id, inquiry.car_id, inquiry.name, inquiry.email, inquiry.phone, inquiry.message),
    )
    inquiry_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return {"message": "Заявка успешно отправлена!", "inquiry_id": inquiry_id}


static_dir = os.path.join(os.path.dirname(__file__), "internet")
if os.path.exists(static_dir):
    app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "server:app",
        host=os.environ.get("HOST", "0.0.0.0"),
        port=int(os.environ.get("PORT", 8000)),
        reload=False,
    )
