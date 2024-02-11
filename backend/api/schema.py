import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from .models import Word, Pars, Lexn, Book, Chap, Vers, Pdgm, Frlc, Frlb

        
class WordNode(DjangoObjectType):
    class Meta:
        model = Word
        filter_fields = {
            'word_id': ['exact', 'in', 'gte', 'lte'],
            'word_english': ['exact', ],
            'word_lexn': ['exact', ],
            'word_pars': ['exact', ],
            'word_lexn_id_copy': ['exact', ],
        }
        interfaces = (relay.Node, )

class LexnNode(DjangoObjectType):
    class Meta:
        model = Lexn
        filter_fields = {
            'lexn_id': ['exact', 'in'],
            'lexn_freq_nt': ['gte','lte']            
        }
        interfaces = (relay.Node, )


class ParsNode(DjangoObjectType):
    class Meta:
        model = Pars
        filter_fields = {
            'pars_id': ['exact'],
            'pars_function': ['exact', 'in'],            
        }
        interfaces = (relay.Node, )

class BookNode(DjangoObjectType):    
    id = graphene.ID(source='pk', required=True)
    
    class Meta:
        model = Book
        filter_fields = {
            'book_id': ['exact', 'in'],            
        }
        interfaces = (relay.Node, )        

class ChapNode(DjangoObjectType):
    class Meta:
        model = Chap
        filter_fields = {
            'chap_id': ['exact', 'in'],
            'chap_book': ['exact', 'in'],            
        }
        interfaces = (relay.Node, )         

class VersNode(DjangoObjectType):
    class Meta:
        model = Vers
        filter_fields = {
            'vers_id': ['exact', 'in'],
        }
        interfaces = (relay.Node, )  

class PdgmNode(DjangoObjectType):
    class Meta:
        model = Pdgm
        filter_fields = {
            'pdgm_lexn': ['exact', 'in'],
            'pdgm_pars': ['exact', 'in'],
        }
        interfaces = (relay.Node, ) 

class FrlcNode(DjangoObjectType):
    class Meta:
        model = Frlc
        filter_fields = {
            'frlc_lexn': ['exact', 'in'],  
            'frlc_book_name_abbrev': ['exact', 'in'],
            'frlc_chap_num': ['exact','in']          
        }
        interfaces = (relay.Node, )

class FrlbNode(DjangoObjectType):
    class Meta:
        model = Frlb
        filter_fields = {
            'frlb_lexn': ['exact', 'in'],            
        }
        interfaces = (relay.Node, )       

                         
class Query(graphene.ObjectType):    
    allWords = DjangoFilterConnectionField(WordNode, max_limit=None)
    allLexns = DjangoFilterConnectionField(LexnNode, max_limit=None)
    allParss = DjangoFilterConnectionField(ParsNode, max_limit=None)
    allBooks = DjangoFilterConnectionField(BookNode, max_limit=None)
    allChaps = DjangoFilterConnectionField(ChapNode, max_limit=None)
    allVerss = DjangoFilterConnectionField(VersNode, max_limit=None)
    allPdgms = DjangoFilterConnectionField(PdgmNode, max_limit=None)
    allFrlcs = DjangoFilterConnectionField(FrlcNode, max_limit=None)
    allFrlbs = DjangoFilterConnectionField(FrlbNode, max_limit=None)

    


schema = graphene.Schema(query=Query)
