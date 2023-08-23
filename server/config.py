from sqlalchemy import create_engine

class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@localhost:5432/echo'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

# sqlalchemy.url = postgresql://postgres:postgres@localhost:5432/echo

# target_metadata = Base.metadata
# from models import Base