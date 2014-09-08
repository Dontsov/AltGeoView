import sys

sys.path.append('.')

BROKER_HOST = "dipprogram"
BROKER_PORT = 5672
BROKER_USER = "diver"
BROKER_PASSWORD = "123"
BROKER_VHOST = "task.local"

CELERY_RESULT_BACKEND = "amqp"

CELERY_IMPORTS = ("tasks",)
