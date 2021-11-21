from django.contrib.gis import admin
from .models import Broute, Comment

# Register your models here.

admin.site.register(Broute, admin.OSMGeoAdmin)
admin.site.register(Comment)