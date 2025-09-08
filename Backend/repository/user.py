import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.user import User
# Cargar las variables de entorno desde el archivo .env
load_dotenv()


def validateUser(email, password):
    try:
        database_url = os.environ.get('DATABASE_URL')

        engine = create_engine(database_url)
        Session = sessionmaker(bind=engine)
        session = Session()

        user = session.query(User).filter(User.email == email, User.password == password).first()
        session.close()

        return user
    except Exception as e:
        session.rollback()
        print(f'Error en validateUser: {e}')
        return None
    finally:
        session.close()


def createUser(email, password, name, last_name, date_of_born, is_admin):
    try:
        database_url = os.environ.get('DATABASE_URL')

        engine = create_engine(database_url)
        Session = sessionmaker(bind=engine)
        session = Session()

        new_user = User(
            name= name,
            last_name= last_name,
            date_of_born= date_of_born,
            email= email,
            password= password,
            is_admin= is_admin 
        )
        session.add(new_user)
        data = [{
            'name': new_user.name,
            'last_name': new_user.last_name,
            'is_admin': new_user.is_admin
        }]
        session.commit()

        return data
    except Exception as e:
        session.rollback()
        print(f'Error en createUser: {e}')
        return None
    finally:
        session.close()


def getAllUsers():
    try:
        database_url = os.environ.get('DATABASE_URL')

        engine = create_engine(database_url)
        Session = sessionmaker(bind=engine)
        session = Session()

        users = session.query(User).all()
        session.close()

        if users is None:
            return users
    
        users_list = []
        for u in users:
            users_list.append({
                "id": u.user_id,
                "name": u.name,
                "email": u.email,
                "dob": u.date_of_born,
                "rol": "Administrador" if u.is_admin else "Cliente"
                # Agrega más campos si es necesario
            })
        return users_list
    except Exception as e:
        session.rollback()
        print(f'Error en validateUser: {e}')
        return None
    finally:
        session.close()