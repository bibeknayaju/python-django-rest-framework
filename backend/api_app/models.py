from django.db import models

# Create your models here.


class Patient(models.Model):
    patient_id = models.BigAutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    blood = models.CharField(max_length=50)

    def __str__(self):
        return self.first_name
