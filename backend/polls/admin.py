from django.contrib import admin

from .models import Poll, Choice, User, Vote
# Register your models here.
admin.site.register(Poll)
admin.site.register(Choice)
admin.site.register(User)
admin.site.register(Vote)