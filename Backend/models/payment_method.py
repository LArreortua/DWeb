
from sqlalchemy import Column, INTEGER, VARCHAR
from .base import Base

class PaymentMethod(Base):
    __tablename__ = 'payment_method'
    __table_args__ = {"schema": "energizen"}
    payment_method_id = Column(INTEGER, primary_key=True)
    name = Column(VARCHAR(50), primary_key=False)
