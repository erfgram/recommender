from atexit import register
from django import template

register = template.Library()

month = {
    '1':'Farvardin 🟢',
    '2':'Ordibehesht 🟢',
    '3':'Khordad 🟢',
    '4':'Tir 🔴',
    '5':'Mordad 🔴',
    '6':'Shahrivar 🔴',
    '7':'Mehr 🟡',
    '8':'Aban 🟡',
    '9':'Azar 🟡',
    '10':'Dey 🔵',
    '11':'Bahman 🔵',
    '12':'Esfand 🔵',
}

@register.filter
def formatmonth(month_num, *args, **kwargs):
    formated = month[str(month_num)]
    return formated