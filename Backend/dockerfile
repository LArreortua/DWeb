FROM python:3.11-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expone el puerto si tu app lo requiere (ajústalo si es necesario)
EXPOSE 5050

# Comando para iniciar la app
CMD ["gunicorn", "-w", "2", "-b", "0.0.0.0:5050", "app:app", "--access-logfile", "-", "--error-logfile", "-"]