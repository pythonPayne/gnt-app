import graphene
import api.schema


class Query(api.schema.Query, graphene.ObjectType):
    hello = graphene.String(default_value="Hello from Django!")


schema = graphene.Schema(query=Query)
