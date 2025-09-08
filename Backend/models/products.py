
from sqlalchemy import Column, INTEGER, VARCHAR, FLOAT, TIMESTAMP
from .base import Base

class Products(Base):
    __tablename__ = 'products'
    __table_args__ = {"schema": "energizen"}
    product_id = Column(INTEGER, primary_key=True)
    name = Column(VARCHAR(100), primary_key=False)
    detail = Column(VARCHAR(250), primary_key=False)
    price = Column(FLOAT, primary_key=False)
    promotion_price = Column(FLOAT, primary_key=False)
    inventory = Column(INTEGER, primary_key=False)
    product_type_id = Column(INTEGER, primary_key=False)
    status_id = Column(INTEGER, primary_key=False)
    created_at = Column(TIMESTAMP, primary_key=False)
    updated_at = Column(TIMESTAMP, primary_key=False)
