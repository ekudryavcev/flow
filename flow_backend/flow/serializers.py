from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_jwt.settings import api_settings
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


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = models.User
        fields = ("token", "username", "password")



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