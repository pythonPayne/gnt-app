#!/bin/sh
../manage.py makemigrations api
../manage.py migrate
python ../api/seedDb.py
DJANGO_SUPERUSER_PASSWORD=stephen ../manage.py createsuperuser --username stephen --email test@test.com --noinput