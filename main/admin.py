from django.contrib import admin
from .models import User, Distance

# Register your models here
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id','name']
    search_fields = ['name']
    list_display_links = list_display


@admin.register(Distance)
class DistanceAdmin(admin.ModelAdmin):
    list_display = ['id','first_id','second_id','distance']
    search_fields = ['distance']
    list_display_links = list_display