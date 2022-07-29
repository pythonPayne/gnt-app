from django.db import models


class Word(models.Model):
    word_id = models.CharField(max_length=8, primary_key=True)    
    word_greek = models.CharField(max_length=36, blank=True, null=True)
    word_english = models.CharField(max_length=36, blank=True, null=True)
    word_greek_punc = models.CharField(max_length=2, blank=True, null=True)
    word_english_punc = models.CharField(max_length=2, blank=True, null=True)
    word_book_name_abbrev = models.CharField(max_length=3)
    word_chap_num = models.IntegerField()
    word_vers_num = models.IntegerField()
    word_word_num = models.IntegerField()
    word_lexn_id_copy = models.CharField(max_length=4, blank=True, null=True)
    word_pars_id_copy = models.CharField(max_length=10, blank=True, null=True)
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
    pars_rank = models.IntegerField()
    
    def __str__(self):
        return self.pars_id


class Lexn(models.Model):
    lexn_id = models.CharField(max_length=4, primary_key=True)
    lexn_greek = models.CharField(max_length=32, blank=True, null=True)
    lexn_greek_long = models.CharField(max_length=64, blank=True, null=True)
    lexn_transliteration = models.CharField(max_length=36, blank=True, null=True)
    lexn_gloss = models.CharField(max_length=32, blank=True, null=True)
    lexn_definition = models.CharField(max_length=128, blank=True, null=True)
    lexn_usage = models.CharField(max_length=256, blank=True, null=True)
    lexn_strongs = models.CharField(max_length=6)    
    lexn_function = models.CharField(max_length=5, blank=True, null=True)
    lexn_freq_nt = models.IntegerField(default=0)
 
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
    chap_num = models.IntegerField()
    chap_book = models.ForeignKey(
        "Book", related_name="chap", on_delete=models.CASCADE, blank=True, null=True)        

    def __str__(self):
        return f"{self.chap_id}"


class Vers(models.Model):
    vers_id = models.CharField(max_length=6, primary_key=True) 
    vers_ref = models.CharField(max_length=22)   
    vers_ref_abbrev = models.CharField(max_length=10)   
    vers_chap_url = models.CharField(max_length=14)  
    vers_book_name_abbrev = models.CharField(max_length=3) 
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

class Gnt(models.Model):
    word_id = models.CharField(max_length=8, primary_key=True)    
    word_greek = models.CharField(max_length=36, blank=True, null=True)
    word_english = models.CharField(max_length=36, blank=True, null=True)
    word_greek_punc = models.CharField(max_length=2, blank=True, null=True)
    word_english_punc = models.CharField(max_length=2, blank=True, null=True)
    word_book_name_abbrev = models.CharField(max_length=3)
    word_chap_num = models.IntegerField()
    word_vers_num = models.IntegerField()
    word_word_num = models.IntegerField()        
    vers_id = models.CharField(max_length=6, blank=True, null=True) 
    vers_ref = models.CharField(max_length=22)   
    vers_ref_abbrev = models.CharField(max_length=10)   
    vers_chap_url = models.CharField(max_length=14)  
    vers_book_name_abbrev = models.CharField(max_length=3) 
    vers_chap_num = models.IntegerField()
    vers_num = models.IntegerField()
    vers_num_words = models.IntegerField()    
    chap_id = models.CharField(max_length=4, blank=True, null=True) 
    chap_num_verses = models.IntegerField()
    chap_num_words = models.IntegerField()
    chap_num = models.IntegerField()    
    book_id = models.CharField(max_length=2, blank=True, null=True) 
    book_name = models.CharField(max_length=16)
    book_name_abbrev = models.CharField(max_length=3)
    book_num_chapters = models.IntegerField()
    book_num_verses = models.IntegerField()
    book_num_words = models.IntegerField()  
    pars_id = models.CharField(max_length=10, blank=True, null=True) 
    pars_function = models.CharField(max_length=5, blank=True, null=True)
    pars_tense = models.CharField(max_length=2, blank=True, null=True)
    pars_voice = models.CharField(max_length=1, blank=True, null=True)
    pars_mood = models.CharField(max_length=1, blank=True, null=True)
    pars_person = models.CharField(max_length=1, blank=True, null=True)
    pars_case = models.CharField(max_length=1, blank=True, null=True)
    pars_gender = models.CharField(max_length=1, blank=True, null=True)
    pars_number = models.CharField(max_length=1, blank=True, null=True)
    pars_freq_nt = models.IntegerField(default=0)
    pars_rank = models.IntegerField()
    lexn_id = models.CharField(max_length=4, blank=True, null=True) 
    lexn_greek = models.CharField(max_length=32, blank=True, null=True)
    lexn_greek_long = models.CharField(max_length=64, blank=True, null=True)
    lexn_transliteration = models.CharField(max_length=36, blank=True, null=True)
    lexn_gloss = models.CharField(max_length=32, blank=True, null=True)
    lexn_definition = models.CharField(max_length=128, blank=True, null=True)
    lexn_usage = models.CharField(max_length=256, blank=True, null=True)
    lexn_strongs = models.CharField(max_length=6)    
    lexn_function = models.CharField(max_length=5, blank=True, null=True)
    lexn_freq_nt = models.IntegerField(default=0)
    pdgm_id = models.CharField(max_length=15, blank=True, null=True) 
    pdgm_greek = models.CharField(max_length=36, blank=True, null=True)
    pdgm_freq_nt = models.IntegerField(default=0)        
    frlc_id = models.CharField(max_length=7, blank=True, null=True) 
    frlc_book_name_abbrev = models.CharField(max_length=3)
    frlc_chap_num = models.IntegerField()
    frlc_count = models.IntegerField()    
    frlb_id = models.CharField(max_length=7, blank=True, null=True) 
    frlb_book_name_abbrev = models.CharField(max_length=3)    
    frlb_count = models.IntegerField()    
    