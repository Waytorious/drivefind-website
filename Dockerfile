FROM python:3.11-slim

WORKDIR /app

# Установка зависимостей
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копирование файлов проекта
COPY . .

# Настройки порта, хоста и пути к базе данных
ENV HOST=0.0.0.0
ENV PORT=8000
ENV DB_PATH=/app/data/drivefind.db

EXPOSE 8000

CMD ["python", "server.py"]
