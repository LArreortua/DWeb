from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class SistusModel(Base):
    __abstract__ = True
