from rest_framework import serializers

from bucketlist.models import BucketList, BucketListItem

class BucketListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BucketListItem
        fields = ('id', 'description')

class BucketListSerializer(serializers.ModelSerializer):
    items = BucketListItemSerializer(many=True)

    class Meta:
        model = BucketList
        fields = ('id', 'created_at', 'modified_at', 'name', 'items')

    def create(self, validated_data):
        list_items = validated_data.pop('items')
        bucket_list = BucketList.objects.create(**validated_data)

        for item in list_items:
            BucketListItem.objects.create(bucket_list=bucket_list, **item)

        return bucket_list

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)

        # If `items` has entries, replace current items with those that are given.
        if len(validated_data['items']) > 0:
            instance.items.all().delete()

            for item in validated_data['items']:
                BucketListItem.objects.create(bucket_list=instance, description=item['description'])

        instance.save()
        return instance