import graphene
import gnt.schema


class Query(gnt.schema.Query, graphene.ObjectType):
    hello = graphene.String(default_value="Hello from Django!")


schema = graphene.Schema(query=Query)
