import os

from sqlalchemy import create_engine, MetaData, Column
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

# Obtener la variable de conexión a la base de datos
database_url = os.environ.get('DATABASE_URL')

# Configuración de la conexión a la base de datos
engine = create_engine(database_url)

schema = 'energizen'

# Reflexión de la base de datos
metadata = MetaData(schema=schema) # Se especifica el esquema
metadata.reflect(bind=engine, schema=schema, resolve_fks=True)
print(f"Tablas reflejadas: {metadata.tables.keys()}")

# Base para los modelos declarativos
Base = declarative_base()

def mapear_tablas_y_generar_archivos(metadata, directorio_modelos='models'):
    import os
    if not os.path.exists(directorio_modelos):
        os.makedirs(directorio_modelos)
    tablas_mapeadas = {}
    for tabla_nombre, tabla_obj in metadata.tables.items():
        class_nombre = ''.join(word.capitalize() for word in tabla_nombre.split('_'))
        class_attrs = {'__tablename__': tabla_nombre}
        columnas_definidas = []
        for columna in tabla_obj.columns:
            print(columna)
            class_attrs[columna.name] = Column(columna.type, primary_key=columna.primary_key)
            columnas_definidas.append(f"    {columna.name} = Column({columna.type}, primary_key={columna.primary_key})")
        TablaClase = type(class_nombre, (Base,), class_attrs)
        tablas_mapeadas[tabla_nombre] = TablaClase
        # Generar el contenido del archivo .py
        contenido_archivo = f"""
from sqlalchemy import Column, INTEGER, VARCHAR, FLOAT, JSON, TIMESTAMP
from .base import Base

class {class_nombre}(Base):
    __tablename__ = '{tabla_nombre}'
{chr(10).join(columnas_definidas)}
"""
        # Escribir el contenido en un archivo .py
        nombre_archivo = os.path.join(directorio_modelos, f'{tabla_nombre}.py')
        with open(nombre_archivo, 'w') as archivo:
            archivo.write(contenido_archivo)
    return tablas_mapeadas

# Generar los modelos y archivos
tablas_mapeadas = mapear_tablas_y_generar_archivos(metadata)
print(f"Conectando a: {database_url}")
# Imprimir los nombres de los modelos generados
print("Modelos generados:")
for nombre_tabla, modelo in tablas_mapeadas.items():
    print(modelo.__name__)