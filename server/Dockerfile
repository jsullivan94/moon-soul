FROM python:3.10

WORKDIR /usr/src/app

COPY . .
RUN pip install pipenv
RUN cd /usr/src/app && pipenv install
RUN cd /usr/src/app && pipenv install --system

CMD [ "python", "app.py" ]