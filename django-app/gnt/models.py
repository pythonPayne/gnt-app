from django.db import models


class BcvIndex(models.Model):
    bcv = models.CharField(max_length=6, primary_key=True)
    book = models.CharField(max_length=3)
    bookLong = models.CharField(max_length=24)
    chapter = models.IntegerField()
    verse = models.IntegerField()

    def __str__(self):
        return self.bcv


class Morphology(models.Model):
    morphology = models.CharField(max_length=24, primary_key=True)
    function = models.CharField(max_length=24, blank=True, null=True)
    tense = models.CharField(max_length=24, blank=True, null=True)
    voice = models.CharField(max_length=24, blank=True, null=True)
    mood = models.CharField(max_length=24, blank=True, null=True)
    person = models.CharField(max_length=24, blank=True, null=True)
    case = models.CharField(max_length=24, blank=True, null=True)
    gender = models.CharField(max_length=24, blank=True, null=True)
    number = models.CharField(max_length=24, blank=True, null=True)

    def __str__(self):
        return self.morphology


class Strongs(models.Model):
    strongs = models.CharField(max_length=12, primary_key=True)
    lexicon = models.CharField(max_length=36, blank=True, null=True)
    gloss = models.CharField(max_length=64, blank=True, null=True)
    transliteration = models.CharField(max_length=36, blank=True, null=True)
    frequency = models.IntegerField(default=0)

    def __str__(self):
        return self.strongs


class Word(models.Model):
    greek = models.CharField(max_length=36, blank=True, null=True)
    english = models.CharField(max_length=36, blank=True, null=True)
    bcv = models.CharField(max_length=6, blank=True, null=True)
    nestleAland = models.BooleanField()
    bcvIndex = models.ForeignKey(
        BcvIndex, related_name="word", on_delete=models.CASCADE)
    morphology = models.ForeignKey(
        Morphology, related_name="word", on_delete=models.CASCADE, blank=True, null=True)
    strongs = models.ForeignKey(
        Strongs, related_name="word", on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"{self.bcvIndex} --- {self.greek} --- {self.english}"
