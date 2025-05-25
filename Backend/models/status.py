
from sqlalchemy import Column, INTEGER, VARCHAR
from .base import Base

class Status(Base):
    __tablename__ = 'status'
    __table_args__ = {"schema": "energizen"}
    status_id = Column(INTEGER, primary_key=True)
    name = Column(VARCHAR(50), primary_key=False)
