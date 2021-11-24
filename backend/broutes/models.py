from django.contrib.gis.db import models
from django.contrib.gis.geos import Polygon
from django.conf import settings


# Create your models here.
class Broute(models.Model):
    r_id = models.BigAutoField(primary_key=True)
    userFK = models.ForeignKey(settings.AUTH_USER_MODEL,
                               on_delete=models.CASCADE)
    title = models.CharField(max_length=200, default='No title')
    route = models.LineStringField()  #models.TextField()
    # bbox = models.PolygonField(default=Polygon())
    distance = models.DecimalField(max_digits=15, decimal_places=4)
    difficulty_choices = [('EASY', 'Easy'), ('INTERMEDIATE', 'Intermediate'),
                          ('DIFFICULT', 'Difficult')]
    difficulty = models.CharField(max_length=15,
                                  choices=difficulty_choices,
                                  default='EASY')
    description = models.TextField(max_length=500, blank=True)
    created = models.DateTimeField(null=True, blank=True, auto_now_add=True)
    edited = models.DateTimeField(null=True, blank=True, auto_now=True)
    deleted = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'broutes'


class Comment(models.Model):
    c_id = models.BigAutoField(primary_key=True)
    comment = models.TextField(max_length=500)
    routeFK = models.ForeignKey(Broute,
                                on_delete=models.CASCADE,
                                related_name='comments')
    author = models.ForeignKey(settings.AUTH_USER_MODEL,
                               on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)
    deleted = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'comments'