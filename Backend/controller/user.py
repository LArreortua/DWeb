from flask import (jsonify)
from repository.user import (validateUser, createUser, getAllUsers)
import hashlib


def validate_user(request):
    try:
        request = request.get_json()
        username = request.get('username')
        password = request.get('password')

        if password is None or username is None:
            return jsonify(error="Usuario o Contraseña faltantes"), 400
           
        password_codificado = password.encode()  # Codifica el mensaje a bytes
        hash_objeto = hashlib.sha256(password_codificado)
        hash_password = hash_objeto.hexdigest()  # Obtiene el hash en formato hexadecimal

        user_data = validateUser(username, hash_password)

        if user_data is None:
            return jsonify(error="Usuario o Contraseña errróneos"), 400
    
        return jsonify({
            'user_data': [{
                'name': user_data.name,
                'isAdmin': user_data.is_admin,
                'last_name': user_data.last_name,
                'email': username,
                'dob': user_data.date_of_born
            }],
        })
    except Exception as e:
        print(f"Error en validate_user: {e}")
        return jsonify(error=str(e)), 400
    

def create_user(request):
    try:
        request = request.get_json()
        username = request.get('username')
        password = request.get('password')
        name = request.get('name')
        last_name = request.get('last_name')
        date_of_born = request.get('date_of_born')
        is_admin = request.get('is_admin')

        if password is None or username is None or name is None:
            return jsonify(error="Datos del usuario faltantes"), 400
           
        password_codificado = password.encode()  # Codifica el mensaje a bytes
        hash_objeto = hashlib.sha256(password_codificado)
        hash_password = hash_objeto.hexdigest()  # Obtiene el hash en formato hexadecimal

        user_data = createUser(username, hash_password, name, last_name, date_of_born, is_admin)
        if user_data is None:
            return jsonify(error="Email previamente registrado"), 400

        return jsonify({
            'created_user': user_data,
        })
    except Exception as e:
        print(f"Error en create_user: {e}")
        return jsonify(error=str(e)), 400
    
def get_all_users(request):
    try:
        users_data = getAllUsers()

        if users_data is None:
            return jsonify(error="No hay usuarios registrados"), 400
    
        return jsonify({
            'users': users_data
        })
    except Exception as e:
        print(f"Error en validate_user: {e}")
        return jsonify(error=str(e)), 400