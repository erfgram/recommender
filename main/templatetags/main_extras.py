from atexit import register
from django import template

register = template.Library()

month = {
    '1':'🟢 Farvardin',
    '2':'🟢 Ordibehesht',
    '3':'🟢 Khordad',
    '4':'🔴 Tir',
    '5':'🔴 Mordad',
    '6':'🔴 Shahrivar',
    '7':'🟡 Mehr',
    '8':'🟡 Aban',
    '9':'🟡 Azar',
    '10':'🔵 Dey',
    '11':'🔵 Bahman',
    '12':'🔵 Esfand',
}

@register.filter
def formatmonth(month_num, *args, **kwargs):
    formated = month[str(month_num)]
    return formated
    
@register.filter
def percentage(distance, *args, **kwargs):
    max = 1423.26
    percentage = abs(round(((distance / max) * 100) - 100,2)) 
    return percentage

@register.filter
def filtersex(Object, value):
    females = Object.filter(sex=value)
    return len(females)

@register.filter
def filtermonth(Object, value):
    month = Object.filter(month = value)
    return len(month)

@register.filter
def filtercity(Object, value):
    month = Object.filter(city = value)
    return len(month)