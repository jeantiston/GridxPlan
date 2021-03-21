from django.contrib import admin
from .models import User, Team, Account, Cell, Post, HashtagGroups
# Register your models here.

admin.site.register(User)
admin.site.register(Post)
admin.site.register(Team)
admin.site.register(Account)
admin.site.register(Cell)
admin.site.register(HashtagGroups)
