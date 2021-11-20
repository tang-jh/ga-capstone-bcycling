from django.db import models
from django.conf import settings


# Create your models here.
class Friend(models.Model):
    f_id = models.AutoField(primary_key=True)
    requester = models.ForeignKey(settings.AUTH_USER_MODEL,
                                  related_name="requester",
                                  on_delete=models.CASCADE)
    to_friend = models.ForeignKey(settings.AUTH_USER_MODEL,
                                  related_name="friend",
                                  on_delete=models.CASCADE)
    accepted = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'friend'
