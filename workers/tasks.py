from celery import Celery

celery = Celery('hello', broker='amqp://diver@task.local//')

@celery.task
def hello():
    return 'hello world'
hello()
