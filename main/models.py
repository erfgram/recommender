from django.db import models
from django.urls import reverse

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=50,blank=True)
    sex = models.BooleanField(default=0)
    city = models.IntegerField(default=300)
    month = models.IntegerField(default=5)
    day = models.IntegerField(default=1)
    

    def __str__(self):
        return str(self.id) + str(self.name)

    
    def get_absolute_url(self):
        return reverse("user",kwargs={"user_id":self.id})

    class Meta:
        managed = True
        verbose_name = 'user'
        verbose_name_plural = 'users'

class Distance(models.Model):
    first = models.ForeignKey(User,on_delete=models.CASCADE,related_name='first',unique=False,default=1)
    second = models.ForeignKey(User,on_delete=models.CASCADE,related_name='second',unique=False)
    distance = models.FloatField()

    def __str__(self):
        return str(self.id) + str(self.first) + str(self.second) + str(self.distance)

    class Meta:
        managed = True
        verbose_name = 'Distance'
        verbose_name_plural = 'Distances'

