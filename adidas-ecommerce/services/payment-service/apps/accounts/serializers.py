from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    gravatar_url = serializers.SerializerMethodField()
    microposts_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    followers_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'name', 'admin', 'activated',
            'created_at', 'gravatar_url', 'microposts_count',
            'following_count', 'followers_count'
        ]
        read_only_fields = ['id', 'created_at', 'admin', 'activated']

    def get_gravatar_url(self, obj):
        return obj.gravatar_url()

    def get_microposts_count(self, obj):
        return obj.microposts_count()

    def get_following_count(self, obj):
        return obj.following_count()

    def get_followers_count(self, obj):
        return obj.followers_count()


class UserDetailSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ['email']
