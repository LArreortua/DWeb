from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
from flasgger import Swagger

app = Flask(__name__)
CORS(app)
swagger = Swagger(app)

from controller.user import (validate_user, create_user, get_all_users)
from controller.products import get_all_products, get_product_detail

@app.route("/", methods=["POST", "GET"])
def root():
    """
    Root health check
    ---
    responses:
      200:
        description: API is active
    """
    return jsonify(message="ACTIVE")


@app.route("/user/validate", methods=["POST"])
def validate_user_():
    """
    Validate user credentials
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            username:
              type: string
            password:
              type: string
    responses:
      200:
        description: User validated
    """
    return validate_user(request)

@app.route("/user/create", methods=["POST"])
def create_user_():
    """
    Create a new user
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            name:
              type: string
            username:
              type: string
            password:
              type: string
            last_name:
              type: string
            date_of_born:
              type: string
            is_admin:
              type: string
    responses:
      200:
        description: User created
    """
    return create_user(request)

@app.route("/products/get-list", methods=["POST"])
def get_all_products_():
    """
    Get all products
    ---
    responses:
      200:
        description: List of products
    """
    return get_all_products(request)

@app.route("/products/get-detail", methods=["POST"])
def get_product_detail_():
    """
    Get product detail
    ---
    parameters:
      - name: product_id
        in: body
        required: true
        schema:
          type: object
          properties:
            product_id:
              type: integer
    responses:
      200:
        description: Product details
    """
    return get_product_detail(request)

@app.route("/users/get-all", methods=["POST"])
def get_all_users_():
    """
    Get all users: recupera el listado de usuarios registrados
    ---
    responses:
      200:
        description: List of users
    """
    return get_all_users(request)


@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)

if __name__ == '__main__':
    try:
        app.run(debug=True, host="0.0.0.0", port=5050)
    except Exception as e:
        print(e)
