import os
import json
import secrets
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Header, Depends, Query, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from database import get_db_connection, init_db, hash_password, verify_password

app = FastAPI(
    title="DriveFind API",
    description="Backend API для автомагазина DriveFind (Практические работы 2 и 3)",
    version="1.0.0"
)

# Разрешаем CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic модели ---
EMAIL_REGEX = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"

class UserRegisterRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: str = Field(..., pattern=EMAIL_REGEX)
    password: str = Field(..., min_length=6, max_length=100)

class UserLoginRequest(BaseModel):
    username: str
    password: str

class InquiryRequest(BaseModel):
    name: str = Field(..., min_length=2)
    email: str = Field(..., pattern=EMAIL_REGEX)
    phone: Optional[str] = None
    message: str = Field(..., min_length=5)
    car_id: Optional[int] = None

# --- Вспомогательная аутентификация ---
def get_current_user(authorization: Optional[str] = Header(None)):
    """Извлечение текущего пользователя по токену Authorization: Bearer <token>"""
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Требуется авторизация (отсутствует токен)"
        )
    
    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный формат заголовка Authorization"
        )
    
    token = parts[1]
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT users.id, users.username, users.email, users.created_at
        FROM users
        JOIN sessions ON users.id = sessions.user_id
        WHERE sessions.token = ?
    """, (token,))
    user = cursor.fetchone()
    conn.close()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Недействительная или устаревшая сессия"
        )
    return dict(user)

def get_optional_user(authorization: Optional[str] = Header(None)) -> Optional[dict]:
    """Необязательный пользователь (для запросов, где авторизация опциональна)"""
    if not authorization:
        return None
    try:
        return get_current_user(authorization)
    except HTTPException:
        return None

# --- Маршруты API ---

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/api/health")
def health_check():
    return {"status": "ok", "app": "DriveFind API v1.0"}

# 1. Список элементов с фильтрацией (Вариант 11: Фильтр по бюджету, году, пробегу)
@app.get("/api/cars")
def get_cars(
    max_price: Optional[float] = Query(None, description="Максимальная цена"),
    min_year: Optional[int] = Query(None, description="Минимальный год выпуска"),
    max_mileage: Optional[int] = Query(None, description="Максимальный пробег (км)"),
    search: Optional[str] = Query(None, description="Поиск по марке или модели"),
    sort: Optional[str] = Query("default", description="Сортировка: default, price_asc, price_desc, year_desc, mileage_asc")
):
    conn = get_db_connection()
    cursor = conn.cursor()

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
        search_term = f"%{search.strip()}%"
        sql += " AND (brand LIKE ? OR model LIKE ?)"
        params.extend([search_term, search_term])

    # Сортировка
    if sort == "price_asc":
        sql += " ORDER BY price ASC"
    elif sort == "price_desc":
        sql += " ORDER BY price DESC"
    elif sort == "year_desc":
        sql += " ORDER BY year DESC"
    elif sort == "mileage_asc":
        sql += " ORDER BY mileage ASC"
    else:
        sql += " ORDER BY id ASC"

    cursor.execute(sql, params)
    rows = cursor.fetchall()
    conn.close()

    cars = []
    for r in rows:
        car_dict = dict(r)
        if "gallery_json" in car_dict and car_dict["gallery_json"]:
            try:
                car_dict["gallery"] = json.loads(car_dict["gallery_json"])
            except Exception:
                car_dict["gallery"] = [car_dict["image_url"]]
        else:
            car_dict["gallery"] = [car_dict["image_url"]]
        cars.append(car_dict)

    return cars

# 2. Один элемент по идентификатору
@app.get("/api/cars/{car_id}")
def get_car_by_id(car_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM cars WHERE id = ?", (car_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Автомобиль с таким ID не найден")

    car = dict(row)
    if "gallery_json" in car and car["gallery_json"]:
        try:
            car["gallery"] = json.loads(car["gallery_json"])
        except Exception:
            car["gallery"] = [car["image_url"]]
    else:
        car["gallery"] = [car["image_url"]]
    return car

# 3. Регистрация пользователя
@app.post("/api/auth/register", status_code=status.HTTP_201_CREATED)
def register(user_data: UserRegisterRequest):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Проверка уникальности логина
    cursor.execute("SELECT id FROM users WHERE username = ?", (user_data.username,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Пользователь с таким логином уже существует"
        )

    # Проверка уникальности email
    cursor.execute("SELECT id FROM users WHERE email = ?", (user_data.email,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Пользователь с таким email уже существует"
        )

    # Хеширование пароля
    pwd_hash = hash_password(user_data.password)

    cursor.execute(
        "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
        (user_data.username, user_data.email, pwd_hash)
    )
    user_id = cursor.lastrowid

    # Создание сессионного токена
    token = secrets.token_hex(32)
    cursor.execute("INSERT INTO sessions (token, user_id) VALUES (?, ?)", (token, user_id))
    conn.commit()
    conn.close()

    return {
        "message": "Регистрация прошла успешно",
        "token": token,
        "user": {
            "id": user_id,
            "username": user_data.username,
            "email": user_data.email
        }
    }

# 4. Вход пользователя
@app.post("/api/auth/login")
def login(login_data: UserLoginRequest):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE username = ?", (login_data.username,))
    user = cursor.fetchone()

    if not user or not verify_password(login_data.password, user["password_hash"]):
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверное имя пользователя или пароль"
        )

    # Создаем новый токен сессии
    token = secrets.token_hex(32)
    cursor.execute("INSERT INTO sessions (token, user_id) VALUES (?, ?)", (token, user["id"]))
    conn.commit()
    conn.close()

    return {
        "message": "Успешный вход",
        "token": token,
        "user": {
            "id": user["id"],
            "username": user["username"],
            "email": user["email"]
        }
    }

# 5. Текущий профиль пользователя
@app.get("/api/auth/me")
def get_me(current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) as fav_count FROM favorites WHERE user_id = ?", (current_user["id"],))
    fav_row = cursor.fetchone()
    conn.close()

    return {
        **current_user,
        "favorites_count": fav_row["fav_count"] if fav_row else 0
    }

# 6. Выход
@app.post("/api/auth/logout")
def logout(authorization: Optional[str] = Header(None)):
    if authorization:
        parts = authorization.split()
        if len(parts) == 2 and parts[0].lower() == "bearer":
            token = parts[1]
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("DELETE FROM sessions WHERE token = ?", (token,))
            conn.commit()
            conn.close()
    return {"message": "Успешный выход"}

# 7. Избранные автомобили пользователя (защищенный контент)
@app.get("/api/favorites")
def get_favorites(current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT cars.* FROM cars
        JOIN favorites ON cars.id = favorites.car_id
        WHERE favorites.user_id = ?
        ORDER BY favorites.created_at DESC
    """, (current_user["id"],))
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]

# 8. Добавление в избранное
@app.post("/api/favorites/{car_id}")
def add_favorite(car_id: int, current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM cars WHERE id = ?", (car_id,))
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="Автомобиль не найден")

    cursor.execute(
        "INSERT OR IGNORE INTO favorites (user_id, car_id) VALUES (?, ?)",
        (current_user["id"], car_id)
    )
    conn.commit()
    conn.close()
    return {"message": "Автомобиль добавлен в избранное"}

# 9. Удаление из избранного
@app.delete("/api/favorites/{car_id}")
def remove_favorite(car_id: int, current_user: dict = Depends(get_current_user)):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "DELETE FROM favorites WHERE user_id = ? AND car_id = ?",
        (current_user["id"], car_id)
    )
    conn.commit()
    conn.close()
    return {"message": "Автомобиль удален из избранного"}

# 10. Отправка формы обратной связи / заявки на тест-драйв
@app.post("/api/inquiries", status_code=status.HTTP_201_CREATED)
def submit_inquiry(inquiry: InquiryRequest, current_user: Optional[dict] = Depends(get_optional_user)):
    user_id = current_user["id"] if current_user else None
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO inquiries (user_id, car_id, name, email, phone, message)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (user_id, inquiry.car_id, inquiry.name, inquiry.email, inquiry.phone, inquiry.message))
    inquiry_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return {
        "message": "Заявка успешно отправлена!",
        "inquiry_id": inquiry_id
    }

# Монтирование статических файлов сайта (папка internet)
static_dir = os.path.join(os.path.dirname(__file__), "internet")
if os.path.exists(static_dir):
    app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("server:app", host=host, port=port, reload=False)
