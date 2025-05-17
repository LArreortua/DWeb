import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.products import Products
from sqlalchemy import text
# Cargar las variables de entorno desde el archivo .env
load_dotenv()

def getProductList():
    try:
        database_url = os.environ.get('DATABASE_URL')

        engine = create_engine(database_url)
        Session = sessionmaker(bind=engine)
        session = Session()

        query_text = """
        select pr.name, pr.price, pt.description, pr.product_id, pr.promotion_price
        from energizen.products pr
        inner join energizen.product_types pt on pr.product_type_id = pt.product_type_id
        where pr.inventory>0 and pr.status_id = 1
        """
        product_list = session.execute(text(query_text))

        session.close()
        product_list = [
            {
                "name": product[2] or None,
                "price": product[1] or None,
                "description": product[2] or None,
                "product_id": product[3] or None,
                "promotion_price": product[4] or None
            }
            for product in product_list
        ]

        return product_list
    except Exception as e:
        session.rollback()
        print(f'Error en validateUser: {e}')
        return None
    finally:
        session.close()



def getProductDetails(product_id):
    try:
        database_url = os.environ.get('DATABASE_URL')

        engine = create_engine(database_url)
        Session = sessionmaker(bind=engine)
        session = Session()

        product_detail = session.query(Products).filter(Products.product_id == product_id, Products.inventory>0, Products.status_id==1).first()

        session.close()
        product_detail = [
            {
                "name": product_detail.name or None,
                "detail": product_detail.detail or None,
                "price": product_detail.price or None,
                "promotion_price": product_detail.promotion_price or None,
                "inventory": product_detail.inventory or None,
            }
        ]

        return product_detail
    except Exception as e:
        session.rollback()
        print(f'Error en validateUser: {e}')
        return None
    finally:
        session.close()