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
<<<<<<< HEAD

    class Meta:
        db_table = 'friend'
=======
>>>>>>> 675b158609e8e0970f393dca5c355fff533e3e3e
