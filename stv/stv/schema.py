import graphene

from graphene_django.types import DjangoObjectType

from .models import Poll, Choice, User, Vote

class PollType(DjangoObjectType):
    class Meta:
        model = Poll

class ChoiceType(DjangoObjectType):
    class Meta:
        model = Choice

class VoteType(DjangoObjectType):
    class Meta:
        model = Vote

class Query(graphene.ObjectType):
    getPoll = graphene.Field(PollType, accessor=graphene.String())

    def resolve_getPoll(self, info, **kwargs):
        accessor = kwargs.get('accessor')
        if accessor is not None:
            return Poll.objects.get(accessor=accessor)
        else:
            return None

schema = graphene.Schema(query=Query)
