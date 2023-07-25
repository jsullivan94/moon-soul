from flask import request, make_response, jsonify, session
from sqlalchemy.exc import IntegrityError

from config import app, db
from models import *


if __name__ == '__main__':
    app.run(port=5555, debug=True)