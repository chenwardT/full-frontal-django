from django.shortcuts import render
from rest_framework import viewsets

from .serializers import BucketListSerializer
from .models import BucketList

class BucketListViewset(viewsets.ModelViewSet):
    queryset = BucketList.objects.all()
    serializer_class = BucketListSerializer