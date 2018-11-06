from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=60)
    password = models.CharField(max_length=50)
    token = models.CharField(max_length=256)



