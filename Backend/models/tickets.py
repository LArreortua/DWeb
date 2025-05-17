
from sqlalchemy import Column, INTEGER, FLOAT, TIMESTAMP, JSON
from .base import Base

class Tickets(Base):
    __tablename__ = 'tickets'
    __table_args__ = {"schema": "energizen"}
    ticket_id = Column(INTEGER, primary_key=True)
    user_id = Column(INTEGER, primary_key=False)
    product_list = Column(JSON, primary_key=False)
    total_price = Column(FLOAT, primary_key=False)
    payment_method_id = Column(INTEGER, primary_key=False)
    status_id = Column(INTEGER, primary_key=False)
    created_data = Column(TIMESTAMP, primary_key=False)
