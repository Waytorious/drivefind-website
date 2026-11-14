import json
import os
import sqlite3
import bcrypt

DEFAULT_DB_PATH = os.path.join(os.path.dirname(__file__), "drivefind.db")
DB_PATH = os.environ.get("DB_PATH", DEFAULT_DB_PATH)


def get_db_connection():
    db_dir = os.path.dirname(os.path.abspath(DB_PATH))
    if db_dir:
        os.makedirs(db_dir, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def hash_password(password: str) -> str:
    """Хеширование пароля с помощью bcrypt."""
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Проверка пароля против хеша."""
    try:
        return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
    except Exception:
        return False


def _gallery(img_url: str) -> str:
    return json.dumps([img_url.replace("/1.", f"/{i}.") for i in (1, 2, 3)])


INITIAL_CARS = [
    {"brand": "Toyota", "model": "RAV4", "year": 2021, "price": 26500.0, "mileage": 45000,
     "transmission": "Автомат", "drivetrain": "Полный (AWD)", "engine": "2.5L Dynamic Force I4",
     "power": "203 л.с.", "torque": "249 Нм", "acceleration": "8.4 сек", "fuel_consumption": "7.8 л / 100 км",
     "weight": "1615 кг", "fuel_tank": "55 л", "body_type": "Кроссовер", "seats": 5,
     "description": "Надежный полноприводный кроссовер в комплектации XLE. Идеальный семейный автомобиль.",
     "image_url": "images/rav4/1.jpeg"},
    {"brand": "Honda", "model": "Civic", "year": 2019, "price": 18200.0, "mileage": 62000,
     "transmission": "Механика", "drivetrain": "Передний (FWD)", "engine": "2.0L DOHC i-VTEC",
     "power": "158 л.с.", "torque": "187 Нм", "acceleration": "8.2 сек", "fuel_consumption": "6.5 л / 100 км",
     "weight": "1290 кг", "fuel_tank": "47 л", "body_type": "Седан", "seats": 5,
     "description": "Динамичный и экономичный седан с механической КПП и одним владельцем.",
     "image_url": "images/civic/1.jpeg"},
    {"brand": "Mazda", "model": "CX-5", "year": 2020, "price": 24000.0, "mileage": 38000,
     "transmission": "Автомат", "drivetrain": "Полный (AWD)", "engine": "2.5L SkyActiv-G",
     "power": "194 л.с.", "torque": "258 Нм", "acceleration": "8.9 сек", "fuel_consumption": "7.2 л / 100 км",
     "weight": "1560 кг", "fuel_tank": "58 л", "body_type": "Кроссовер", "seats": 5,
     "description": "Кроссовер в цвете Soul Red Crystal: кожаный салон, адаптивный круиз-контроль, акустика Bose.",
     "image_url": "images/cx-5/1.jpeg"},
    {"brand": "BMW", "model": "3 Series", "year": 2018, "price": 22900.0, "mileage": 85000,
     "transmission": "Автомат", "drivetrain": "Задний (RWD)", "engine": "2.0L TwinPower Turbo",
     "power": "184 л.с.", "torque": "270 Нм", "acceleration": "7.3 сек", "fuel_consumption": "6.0 л / 100 км",
     "weight": "1500 кг", "fuel_tank": "60 л", "body_type": "Седан", "seats": 5,
     "description": "Баварская классика с идеальным балансом шасси и полной сервисной историей.",
     "image_url": "images/bmw-3/1.jpeg"},
    {"brand": "Tesla", "model": "Cybertruck", "year": 2023, "price": 60990.0, "mileage": 21000,
     "transmission": "Автомат", "drivetrain": "Полный (AWD)", "engine": "Dual Motor Electric",
     "power": "600 л.с.", "torque": "750 Нм", "acceleration": "4.1 сек", "fuel_consumption": "0 л / 100 км",
     "weight": "2995 кг", "fuel_tank": "123 кВт⋅ч", "body_type": "Пикап", "seats": 5,
     "description": "Электрический пикап из нержавеющей стали с пневмоподвеской и запасом хода более 500 км.",
     "image_url": "images/cybertruck/1.jpeg"},
    {"brand": "Volkswagen", "model": "Golf", "year": 2017, "price": 14500.0, "mileage": 92000,
     "transmission": "Механика", "drivetrain": "Передний (FWD)", "engine": "1.4L TSI",
     "power": "125 л.с.", "torque": "200 Нм", "acceleration": "9.1 сек", "fuel_consumption": "5.3 л / 100 км",
     "weight": "1257 кг", "fuel_tank": "50 л", "body_type": "Хэтчбек", "seats": 5,
     "description": "Практичный немецкий хэтчбек с экономичным турбомотором и недорогой обслугой.",
     "image_url": "images/golf/1.jpeg"},
    {"brand": "Mazda", "model": "MX-5 Miata", "year": 2005, "price": 15400.0, "mileage": 28000,
     "transmission": "Механика", "drivetrain": "Задний (RWD)", "engine": "2.0L SkyActiv-G I4",
     "power": "181 л.с.", "torque": "205 Нм", "acceleration": "6.5 сек", "fuel_consumption": "6.9 л / 100 км",
     "weight": "1058 кг", "fuel_tank": "45 л", "body_type": "Родстер", "seats": 2,
     "description": "Компактный и легкий родстер с развесовкой 50:50 и бережным обслуживанием.",
     "image_url": "images/miata/1.jpeg"},
    {"brand": "Ford", "model": "Mustang", "year": 2020, "price": 29800.0, "mileage": 34000,
     "transmission": "Автомат", "drivetrain": "Задний (RWD)", "engine": "2.3L EcoBoost Turbo",
     "power": "310 л.с.", "torque": "475 Нм", "acceleration": "5.3 сек", "fuel_consumption": "9.5 л / 100 км",
     "weight": "1650 кг", "fuel_tank": "60 л", "body_type": "Купе", "seats": 4,
     "description": "Американский пони-кар с ярким дизайном, спортивным салоном и мультимедиа SYNC 3.",
     "image_url": "images/mustang/1.jpeg"},
    {"brand": "Nissan", "model": "Altima", "year": 2021, "price": 19500.0, "mileage": 41000,
     "transmission": "Автомат", "drivetrain": "Передний (FWD)", "engine": "2.5L DOHC I4",
     "power": "188 л.с.", "torque": "244 Нм", "acceleration": "7.9 сек", "fuel_consumption": "7.1 л / 100 км",
     "weight": "1460 кг", "fuel_tank": "61 л", "body_type": "Седан", "seats": 5,
     "description": "Комфортабельный семейный седан с креслами Zero Gravity и пакетом безопасности Safety Shield 360.",
     "image_url": "images/altima/1.jpeg"},
    {"brand": "Audi", "model": "A4", "year": 2019, "price": 23700.0, "mileage": 58000,
     "transmission": "Автомат", "drivetrain": "Полный (AWD)", "engine": "2.0L TFSI Quattro",
     "power": "249 л.с.", "torque": "370 Нм", "acceleration": "5.8 сек", "fuel_consumption": "6.8 л / 100 км",
     "weight": "1585 кг", "fuel_tank": "58 л", "body_type": "Седан", "seats": 5,
     "description": "Премиальный седан с полным приводом Quattro, виртуальной приборкой и матричными фарами.",
     "image_url": "images/audi_a4/1.jpeg"},
    {"brand": "Subaru", "model": "Outback", "year": 2018, "price": 20100.0, "mileage": 76000,
     "transmission": "Автомат", "drivetrain": "Полный (AWD)", "engine": "2.5L Boxer 4",
     "power": "175 л.с.", "torque": "235 Нм", "acceleration": "9.6 сек", "fuel_consumption": "7.7 л / 100 км",
     "weight": "1630 кг", "fuel_tank": "60 л", "body_type": "Универсал", "seats": 5,
     "description": "Универсал повышенной проходимости с полным приводом и клиренсом 213 мм.",
     "image_url": "images/outback/1.jpeg"},
    {"brand": "Kia", "model": "Sportage", "year": 2022, "price": 27300.0, "mileage": 19000,
     "transmission": "Автомат", "drivetrain": "Полный (AWD)", "engine": "2.5L Smartstream",
     "power": "187 л.с.", "torque": "241 Нм", "acceleration": "8.8 сек", "fuel_consumption": "8.1 л / 100 км",
     "weight": "1610 кг", "fuel_tank": "54 л", "body_type": "Кроссовер", "seats": 5,
     "description": "Кроссовер в максимальной комплектации: цифровой дисплей, панорамная крыша, камеры 360.",
     "image_url": "images/sportage/1.jpeg"},
    {"brand": "BMW", "model": "320i M-Sport", "year": 2021, "price": 31500.0, "mileage": 35000,
     "transmission": "Автомат", "drivetrain": "Задний (RWD)", "engine": "2.0L TwinPower Turbo",
     "power": "184 л.с.", "torque": "300 Нм", "acceleration": "7.1 сек", "fuel_consumption": "6.3 л / 100 км",
     "weight": "1535 кг", "fuel_tank": "59 л", "body_type": "Седан", "seats": 5,
     "description": "Седан поколения G20 в M-пакете: спортивная подвеска, тормоза M Sport и сиденья с алькантарой.",
     "image_url": "images/bmw-3/1.jpeg"},
    {"brand": "Ford", "model": "Mustang GT", "year": 2021, "price": 38500.0, "mileage": 22000,
     "transmission": "Автомат", "drivetrain": "Задний (RWD)", "engine": "5.0L Coyote V8",
     "power": "450 л.с.", "torque": "529 Нм", "acceleration": "4.3 сек", "fuel_consumption": "12.1 л / 100 км",
     "weight": "1730 кг", "fuel_tank": "61 л", "body_type": "Купе", "seats": 4,
     "description": "Настоящий V8 с активным выхлопом, подвеской MagneRide и тормозами Brembo.",
     "image_url": "images/mustang/1.jpeg"},
    {"brand": "Honda", "model": "Civic Sport", "year": 2022, "price": 21800.0, "mileage": 27000,
     "transmission": "Вариатор", "drivetrain": "Передний (FWD)", "engine": "1.5L Turbo VTEC",
     "power": "180 л.с.", "torque": "240 Нм", "acceleration": "7.5 сек", "fuel_consumption": "6.4 л / 100 км",
     "weight": "1340 кг", "fuel_tank": "47 л", "body_type": "Хэтчбек", "seats": 5,
     "description": "Хэтчбек 11-го поколения с минималистичным салоном и пакетом систем Honda Sensing.",
     "image_url": "images/civic/1.jpeg"},
    {"brand": "Toyota", "model": "RAV4 Hybrid", "year": 2022, "price": 32900.0, "mileage": 25000,
     "transmission": "Вариатор", "drivetrain": "Полный (AWD-i)", "engine": "2.5L Hybrid e-Four",
     "power": "222 л.с.", "torque": "279 Нм", "acceleration": "8.1 сек", "fuel_consumption": "4.8 л / 100 км",
     "weight": "1690 кг", "fuel_tank": "55 л", "body_type": "Кроссовер", "seats": 5,
     "description": "Гибридный кроссовер с низким расходом топлива, бесключевым доступом и подогревом сидений.",
     "image_url": "images/rav4/1.jpeg"},
]


def init_db():
    """Создание таблиц SQLite и начальное заполнение базы."""
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.executescript("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS cars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brand TEXT NOT NULL,
        model TEXT NOT NULL,
        year INTEGER NOT NULL,
        price REAL NOT NULL,
        mileage INTEGER NOT NULL,
        transmission TEXT NOT NULL,
        drivetrain TEXT NOT NULL,
        engine TEXT NOT NULL,
        power TEXT NOT NULL,
        torque TEXT NOT NULL,
        acceleration TEXT NOT NULL,
        fuel_consumption TEXT NOT NULL,
        weight TEXT NOT NULL,
        fuel_tank TEXT NOT NULL,
        body_type TEXT NOT NULL,
        seats INTEGER NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL,
        gallery_json TEXT DEFAULT '[]'
    );

    CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        car_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE,
        UNIQUE(user_id, car_id)
    );

    CREATE TABLE IF NOT EXISTS inquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        car_id INTEGER,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
        token TEXT PRIMARY KEY,
        user_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    """)

    # Тестовый пользователь demo / demo123
    cursor.execute("SELECT id FROM users WHERE username = ?", ("demo",))
    if not cursor.fetchone():
        cursor.execute(
            "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
            ("demo", "demo@drivefind.com", hash_password("demo123"))
        )

    # Заполнение каталога при первом запуске
    cursor.execute("SELECT COUNT(*) FROM cars")
    if cursor.fetchone()[0] == 0:
        cols = list(INITIAL_CARS[0].keys()) + ["gallery_json"]
        placeholders = ", ".join(["?"] * len(cols))
        rows = [
            tuple(car[k] for k in INITIAL_CARS[0].keys()) + (_gallery(car["image_url"]),)
            for car in INITIAL_CARS
        ]
        cursor.executemany(f"INSERT INTO cars ({', '.join(cols)}) VALUES ({placeholders})", rows)

        cursor.execute("SELECT id FROM users WHERE username = ?", ("demo",))
        user_demo = cursor.fetchone()
        if user_demo:
            cursor.executemany(
                "INSERT OR IGNORE INTO favorites (user_id, car_id) VALUES (?, ?)",
                [(user_demo["id"], 1), (user_demo["id"], 7)]
            )

    conn.commit()
    conn.close()


if __name__ == "__main__":
    init_db()
    print("Database successfully initialized!")
