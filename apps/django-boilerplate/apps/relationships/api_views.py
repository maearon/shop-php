from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

@method_decorator(csrf_exempt, name='dispatch')
class RelationshipViewSet(ViewSet):
    def list(self, request):
        return Response({"message": "Hello from RelationshipViewSet"})
