from django.db import models

class BucketList(models.Model):
    name = models.CharField(max_length=40)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def display(self):
        print(self.name)
        for item in self.bucketlistitem_set.all():
            print('-{}'.format(item))

class BucketListItem(models.Model):
    description = models.CharField(max_length=100)
    bucket_list = models.ForeignKey(BucketList, related_name='items', related_query_name='item')

    def __str__(self):
        return self.description