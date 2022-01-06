FROM python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt update -y

RUN mkdir -p /var/www
COPY ./requirements.txt /var/www
RUN pip install -r /var/www/requirements.txt

COPY ./app.py /var/www
COPY ./gunicorn.py /var/www

WORKDIR /var/www

CMD ["gunicorn", "app:app", "--config", "/var/www/gunicorn.py" ]