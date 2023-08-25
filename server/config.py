import cloudinary

cloudinary.config(
    cloud_name='dyahkvt1m',
    api_key='772552848921945',
    api_secret='aT2P256eQn6xr9r-2IDF1JRDShk'
)

class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@localhost:5432/echo'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

# sqlalchemy.url = postgresql://postgres:postgres@localhost:5432/echo

# target_metadata = Base.metadata
# from models import Base