from django.shortcuts import render
from rest_framework import viewsets

from .serializers import BucketListSerializer
from .models import BucketList


class BucketListViewset(viewsets.ModelViewSet):
    queryset = BucketList.objects.all()
    serializer_class = BucketListSerializer


def bucketlist_index(request):
    bucketlists = BucketList.objects.all()
    return render(request, 'bucketlist/index.html', context={'bucketlists': bucketlists})


def bucketlist_detail(request, id):
    return render(request, 'bucketlist/detail.html', context={'id': id})
