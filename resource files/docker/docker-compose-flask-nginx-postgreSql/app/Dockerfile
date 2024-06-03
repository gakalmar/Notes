FROM python:3.9-slim

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt 
# --no--cache-dir means don't store anything during package installation

EXPOSE 5000

CMD ["python", "app.py"]