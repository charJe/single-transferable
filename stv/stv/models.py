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