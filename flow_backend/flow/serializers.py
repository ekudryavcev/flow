from rest_framework import serializers
from django.contrib.auth import authenticate
from . import models


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        fields = (
            "first_name",
            "last_name",
            "board_roles",
            "assigned_to",
            "cards_created",
            "username",
            "email",
            "preferences",
            "is_superuser"
        )
        model = models.User


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")


class CreateUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.User
        fields = ("id", "username", "password", "email", "is_superuser")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = models.User.objects.create_user(validated_data["username"],
                                               None,
                                               validated_data["password"])
        return user


class CardSerializer(serializers.ModelSerializer):

    class Meta:
        fields = (
            "name",
            "local_id",
            "board",
            "column",
            "description",
            "creation_date",
            "creator",
            "last_edit_date",
            "is_archived",
            "is_deleted",
            "task_list",
            "assignees",
            "tags"
        )
        model = models.Card


class ColumnSerializer(serializers.ModelSerializer):

    class Meta:
        fields = (
            "name",
            "board",
            "is_private",
            "description",
            "creation_date",
            "last_edit_date",
            "creator",
            "cards"
        )
        model = models.Column


class BoardSerializer(serializers.ModelSerializer):

    class Meta:
        fields = (
            "name",
            "project_id",
            "creation_date",
            "last_edit_date",
            "owner",
            "users",
            "columns",
            "cards",
            "tags"
        )
        model = models.Board


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        fields = (
            "name",
            "color",
            "creator",
            "board",
            "creation_date",
            "last_edit_date",
            "creator",
            "cards_labeled"
        )
        model = models.Tag