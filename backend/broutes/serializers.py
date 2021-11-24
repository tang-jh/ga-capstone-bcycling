from .models import Broute, Comment
from rest_framework import serializers
from rest_framework_gis import serializers as gis_serializers


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class BrouteSerializer(gis_serializers.GeoFeatureModelSerializer):
    comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Broute
        geo_field = 'route'
        # bbox_geo_field = 'bbox'
        auto_bbox = True
        fields = '__all__'


#bbox .... from_bbox
