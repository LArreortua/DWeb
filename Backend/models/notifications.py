
from sqlalchemy import Column, INTEGER, VARCHAR, TIMESTAMP, BOOLEAN
from .base import Base

class Notifications(Base):
    __tablename__ = 'notifications'
    __table_args__ = {"schema": "energizen"}
    notification_id = Column(INTEGER, primary_key=True)
    concetp = Column(VARCHAR(50), primary_key=False)
    created_date = Column(TIMESTAMP, primary_key=False)
    has_been_seen = Column(BOOLEAN, primary_key=False)
