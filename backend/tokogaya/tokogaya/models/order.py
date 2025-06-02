from sqlalchemy import Column, Integer, String, Float
from .meta import Base

class Order(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True)
    product_name = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    category = Column(String, nullable=False)
    total_price = Column(Float, nullable=False)
