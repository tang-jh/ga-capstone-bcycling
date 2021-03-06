# Generated by Django 3.2.9 on 2021-11-21 13:19

import django.contrib.gis.db.models.fields
import django.contrib.gis.geos.polygon
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('broutes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='broute',
            name='bbox',
            field=django.contrib.gis.db.models.fields.PolygonField(default=django.contrib.gis.geos.polygon.Polygon(), srid=4326),
        ),
        migrations.AlterField(
            model_name='broute',
            name='route',
            field=django.contrib.gis.db.models.fields.LineStringField(srid=4326),
        ),
    ]
