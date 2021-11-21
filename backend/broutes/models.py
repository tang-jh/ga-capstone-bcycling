from django.db import models
from django.conf import settings


# Create your models here.
class BRoute(models.Model):
    r_id = models.BigAutoField(primary_key=True)
    userFK = models.ForeignKey(settings.AUTH_USER_MODEL,
                               on_delete=models.CASCADE)
    title = models.CharField(max_length=200, default='No title')
    route = models.TextField()
    distance = models.DecimalField(decimal_places=2)
    difficulty_choices = [('EASY', 'Easy'), ('INTERMEDIATE', 'Intermediate'),
                          ('DIFFICULT', 'Difficult')]
    difficulty = models.CharField(max_length=15,
                                  choices=difficulty_choices,
                                  default='EASY')
    description = models.TextField(max_length=500, blank=True)
    created = models.DateTimeField(null=True, blank=True)
    edited = models.DateTimeField(null=True, blank=True)
    deleted = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'broutes'


class Comment(models.Model):
    c_id = models.BigAutoField(primary_key=True)
    comment = models.TextField(max_length=500)
    routeFK = models.ForeignKey(BRoute, on_delete=models.CASCADE)
    author = models.ForeignKey(settings.AUTH_USER_MODEL,
                               on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)
    deleted = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'comments'