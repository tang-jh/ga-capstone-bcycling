# Generated by Django 3.2.9 on 2021-11-22 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('broutes', '0003_alter_comment_routefk'),
    ]

    operations = [
        migrations.AlterField(
            model_name='broute',
            name='created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='broute',
            name='edited',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]
