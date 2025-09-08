from flask import (jsonify)
from repository.products import getProductList, getProductDetails


def get_all_products(request):
    try:
        # request = request.get_json()
        # token = request.get('token')

        # if token is None:
        #     return jsonify(error="Usuario no válido"), 400

        product_list = getProductList()

        if product_list is None:
            return jsonify(error="No se encontraron productos"), 400
    
        return jsonify({
            'product_list': product_list
        })
    except Exception as e:
        print(f"Error en validate_user: {e}")
        return jsonify(error=str(e)), 400
    

def get_product_detail(request):
    try:
        request = request.get_json()
        token = request.get('token')
        product_id = request.get('product_id')

        # if token is None:
        #     return jsonify(error="Usuario no válido"), 400

        product_detail = getProductDetails(product_id)

        if product_detail is None:
            return jsonify(error="No se encontró el producto"), 400
    
        return jsonify({
            'product_detail': product_detail
        })
    except Exception as e:
        print(f"Error en validate_user: {e}")
        return jsonify(error=str(e)), 400