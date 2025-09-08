
from sqlalchemy import Column, INTEGER, VARCHAR
from .base import Base

class ProductTypes(Base):
    __tablename__ = 'product_types'
    __table_args__ = {"schema": "energizen"}
    product_type_id = Column(INTEGER, primary_key=True)
    name = Column(VARCHAR(50), primary_key=False)
    description = Column(VARCHAR(150), primary_key=False)
