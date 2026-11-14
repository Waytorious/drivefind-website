# DriveFind

Учебный веб-проект по дисциплине «Введение в интернет-технологии».
**Вариант 11** (Магазин автомобилей: фильтр по бюджету, году и пробегу; страница действия — сравнение авто).

**Сайт:** https://drivefind-demo.duckdns.org

## Что сделано

- **ПР 1 (HTML/CSS):** 6 связанных страниц (`index.html`, `catalogue.html`, `item.html`, `compare.html`, `contacts.html`, `favorites.html`), семантическая разметка, адаптивная верстка от 360px в `internet/style.css`.
- **ПР 2 (JS и внешний API):** фильтрация и сортировка в каталоге, валидация формы обратной связи с выводом ошибок у полей, фотогалерея авто, сравнение двух моделей и виджет погоды через Open-Meteo (`internet/main.js`).
- **ПР 3 (FastAPI + SQLite):** бэкенд на `server.py`, БД на 5 таблиц (`database.py`) с 16 автомобилями, регистрация/вход (хеширование паролей через `bcrypt`, токены сессий, параметризованные SQL-запросы) и раздел избранного.
- **ПР 4 (Docker + хостинг):** зафиксированы зависимости (`requirements.txt`), настройки (`HOST`, `PORT`, `DB_PATH`) вынесены в переменные окружения (пример в `.env.example`), проект упакован в `Dockerfile` и запущен на сервере с HTTPS.

## База данных (SQLite)

- `users`: `id` (INTEGER PK), `username` (TEXT UNIQUE), `email` (TEXT UNIQUE), `password_hash` (TEXT), `created_at` (TIMESTAMP).
- `cars`: `id` (INTEGER PK), `brand`, `model`, `year` (INTEGER), `price` (REAL), `mileage` (INTEGER), `transmission`, `drivetrain`, `engine`, `power`, `torque`, `acceleration`, `fuel_consumption`, `weight`, `fuel_tank`, `body_type`, `seats` (INTEGER), `description`, `image_url`, `gallery_json` (TEXT).
- `favorites`: `id` (INTEGER PK), `user_id` (FK -> `users.id`), `car_id` (FK -> `cars.id`), `created_at` (TIMESTAMP), уникальная пара `(user_id, car_id)`.
- `inquiries`: `id` (INTEGER PK), `user_id` (FK -> `users.id`), `car_id` (FK -> `cars.id`), `name`, `email`, `phone`, `message`, `status`, `created_at`.
- `sessions`: `token` (TEXT PK), `user_id` (FK -> `users.id`), `created_at` (TIMESTAMP).

## API

- `GET /api/health` — проверка состояния сервиса
- `GET /api/cars`, `GET /api/cars/{car_id}` — список (с фильтрами) и карточка автомобиля
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/logout` — авторизация
- `GET /api/favorites`, `POST /api/favorites/{car_id}`, `DELETE /api/favorites/{car_id}` — избранное (по токену)
- `POST /api/inquiries` — сохранение заявки с формы контактов

Документация Swagger доступна на `/docs`.

## Запуск

### Локально (Python 3)

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 server.py
```

Сайт откроется на `http://127.0.0.1:8000` (база создается автоматически при старте).

### Через Docker

```bash
docker build -t drivefind .
docker run -d --name drivefind -p 8000:8000 -v drivefind_data:/app/data drivefind
```

Доступно на `http://localhost:8000`.

## Тестовый аккаунт

- **Логин:** `demo`
- **Пароль:** `demo123`
