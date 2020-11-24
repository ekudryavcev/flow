from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from .models import Card
from .serializers import CardSerializer


class CardViewSet(ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    permission_classes = [AllowAny]