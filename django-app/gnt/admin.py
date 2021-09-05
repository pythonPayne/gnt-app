from django.contrib import admin
from .models import BcvIndex, Morphology, Strongs, Word, Paradigm

admin.site.register(BcvIndex)
admin.site.register(Morphology)
admin.site.register(Strongs)
admin.site.register(Word)
admin.site.register(Paradigm)