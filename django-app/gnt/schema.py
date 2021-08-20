import graphene
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from .models import BcvIndex, Strongs, Morphology, Word


class BcvIndexNode(DjangoObjectType):
    class Meta:
        model = BcvIndex
        filter_fields = {
            'bcv': ['exact', 'in', 'gte', 'lte'],
            'book': ['exact', ],
            'chapter': ['exact', ],
        }
        interfaces = (relay.Node, )


class StrongsNode(DjangoObjectType):
    class Meta:
        model = Strongs
        filter_fields = {
            'strongs': ['exact', 'in'],
        }
        interfaces = (relay.Node, )


class MorphologyNode(DjangoObjectType):
    class Meta:
        model = Morphology
        filter_fields = {
            'morphology': ['exact']
        }
        interfaces = (relay.Node, )


class WordNode(DjangoObjectType):

    class Meta:
        model = Word
        filter_fields = {
            'english': ['exact', ],
            'strongs': ['exact', ],
            'bcv': ['exact', 'in', 'gte', 'lte'],
            'nestleAland': ['exact'],
        }
        interfaces = (relay.Node, )


class Query(graphene.ObjectType):
    allBcvindices = DjangoFilterConnectionField(BcvIndexNode)
    allWords = DjangoFilterConnectionField(WordNode)
    allStrongs = DjangoFilterConnectionField(StrongsNode)
    allMorphologies = DjangoFilterConnectionField(MorphologyNode)


schema = graphene.Schema(query=Query)
