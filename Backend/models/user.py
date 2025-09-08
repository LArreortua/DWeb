
from sqlalchemy import Column, INTEGER, VARCHAR, DATE, TIMESTAMP, BOOLEAN
from .base import Base

class User(Base):
    __tablename__ = 'user'
    __table_args__ = {"schema": "energizen"}
    user_id = Column(INTEGER, primary_key=True)
    name = Column(VARCHAR(60), primary_key=False)
    last_name = Column(VARCHAR(60), primary_key=False)
    date_of_born = Column(DATE, primary_key=False)
    email = Column(VARCHAR(100), primary_key=False)
    password = Column(VARCHAR(100), primary_key=False)
    created_data = Column(TIMESTAMP, primary_key=False)
    is_admin = Column(BOOLEAN, primary_key=False)
