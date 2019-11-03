# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class Poll(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    numWinners = models.IntegerField()
    accessor = models.CharField(max_length=11, unique=True)
    endDate = models.DateTimeField()
    isPrivate = models.BooleanField(default=False)

class Choice(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)

class User(models.Model):
    email = models.EmailField(null=True)

class Vote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)
    rank = models.IntegerField()


