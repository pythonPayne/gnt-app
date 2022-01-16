from django.db import models


class Word(models.Model):
    word_id = models.CharField(max_length=8, primary_key=True)    
    word_greek = models.CharField(max_length=36, blank=True, null=True)
    word_english = models.CharField(max_length=36, blank=True, null=True)
    word_greek_punc = models.CharField(max_length=2, blank=True, null=True)
    word_english_punc = models.CharField(max_length=2, blank=True, null=True)
    word_pars = models.ForeignKey(
        "Pars", related_name="word", on_delete=models.CASCADE, blank=True, null=True)
    word_lexn = models.ForeignKey(
        "Lexn", related_name="word", on_delete=models.CASCADE, blank=True, null=True)
    word_book = models.ForeignKey(
        "Book", related_name="word", on_delete=models.CASCADE, blank=True, null=True)        
    word_chap = models.ForeignKey(
        "Chap", related_name="word", on_delete=models.CASCADE, blank=True, null=True)                
    word_vers = models.ForeignKey(
        "Vers", related_name="word", on_delete=models.CASCADE, blank=True, null=True)                
        
    def __str__(self):
        return f"{self.word_id} --- {self.word_greek} --- {self.word_english}"


class Pars(models.Model):
    pars_id = models.CharField(max_length=10, primary_key=True)
    pars_function = models.CharField(max_length=5, blank=True, null=True)
    pars_tense = models.CharField(max_length=2, blank=True, null=True)
    pars_voice = models.CharField(max_length=1, blank=True, null=True)
    pars_mood = models.CharField(max_length=1, blank=True, null=True)
    pars_person = models.CharField(max_length=1, blank=True, null=True)
    pars_case = models.CharField(max_length=1, blank=True, null=True)
    pars_gender = models.CharField(max_length=1, blank=True, null=True)
    pars_number = models.CharField(max_length=1, blank=True, null=True)
    pars_freq_nt = models.IntegerField(default=0)
    
    def __str__(self):
        return self.pars_id


class Lexn(models.Model):
    lexn_id = models.CharField(max_length=4, primary_key=True)
    lexn_greek = models.CharField(max_length=36, blank=True, null=True)
    lexn_english = models.CharField(max_length=36, blank=True, null=True)
    lexn_transliteration = models.CharField(max_length=36, blank=True, null=True)
    lexn_freq_nt = models.IntegerField(default=0)
    lexn_function = models.CharField(max_length=5, blank=True, null=True)
 
    def __str__(self):
        return f"{self.lexn_id} --- {self.lexn_greek}"

class Book(models.Model):
    book_id = models.CharField(max_length=2, primary_key=True)
    book_name = models.CharField(max_length=16)
    book_name_abbrev = models.CharField(max_length=3)
    book_num_chapters = models.IntegerField()
    book_num_verses = models.IntegerField()
    book_num_words = models.IntegerField()   

    def __str__(self):
        return f"{self.book_name}"

class Chap(models.Model):
    chap_id = models.CharField(max_length=4, primary_key=True)
    chap_num_verses = models.IntegerField()
    chap_num_words = models.IntegerField()
    chap_book = models.ForeignKey(
        "Book", related_name="chap", on_delete=models.CASCADE, blank=True, null=True)        

    def __str__(self):
        return f"{self.chap_id}"

class Vers(models.Model):
    vers_id = models.CharField(max_length=6, primary_key=True) 
    vers_ref = models.CharField(max_length=22)   
    vers_ref_abbrev = models.CharField(max_length=10)   
    vers_chap_url = models.CharField(max_length=6)   
    vers_chap_num = models.IntegerField()
    vers_num = models.IntegerField()
    vers_num_words = models.IntegerField()
    vers_book = models.ForeignKey(
        "Book", related_name="vers", on_delete=models.CASCADE, blank=True, null=True)    
    vers_chap = models.ForeignKey(
        "Chap", related_name="vers", on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"{self.vers_id}"

class Pdgm(models.Model):
    pdgm_id = models.CharField(max_length=15, primary_key=True) 
    pdgm_greek = models.CharField(max_length=36, blank=True, null=True)
    pdgm_freq_nt = models.IntegerField(default=0)
    pdgm_lexn = models.ForeignKey(
        "Lexn", related_name="pdgm", on_delete=models.CASCADE, blank=True, null=True)
    pdgm_pars = models.ForeignKey(
        "Pars", related_name="pdgm", on_delete=models.CASCADE, blank=True, null=True)
    

    def __str__(self):
        return f"{self.pdgm_lexn} --- {self.pdgm_pars} --- {self.pdgm_greek}"