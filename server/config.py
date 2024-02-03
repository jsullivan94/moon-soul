# from flask import Flask
# from flask_bcrypt import Bcrypt
# from flask_migrate import Migrate
# from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import MetaData
# from flask_cors import CORS
# import os


# app = Flask(__name__, static_folder='../client/build', static_url_path='/')
# CORS(app, supports_credentials=True)
# uri = os.getenv("DATABASE_URL", "sqlite:///app.db")  # or other relevant config var
# if uri.startswith("postgres://"):
#     uri = uri.replace("postgres://", "postgresql://", 1)
# app.config["SQLALCHEMY_DATABASE_URI"] = uri
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.json.compact = False

# metadata = MetaData(naming_convention={
#     "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
# })
# db = SQLAlchemy(metadata=metadata)

# migrate = Migrate(app, db)
# db.init_app(app)

# bcrypt = Bcrypt(app)
