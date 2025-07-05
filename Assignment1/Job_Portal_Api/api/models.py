from django.db import models


# Create your models here.
class Company(models.Model):
    name = models.CharField(max_length=255, blank=False)
    location = models.CharField(max_length=255, blank=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class JobPost(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, blank=False)
    description = models.TextField()
    salary = models.IntegerField()
    location = models.CharField(max_length=255, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Applicant(models.Model):
    name = models.CharField(max_length=255, blank=False)
    email = models.EmailField()
    resume_link = models.URLField()
    job = models.ForeignKey(JobPost, on_delete=models.CASCADE)
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} for {self.job}"
