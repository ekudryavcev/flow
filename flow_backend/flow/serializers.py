from rest_framework import serializers
from . import models


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        fields = (
            "firstname",
            "surname",
            "lastname",
            "board_roles",
            "assigned_to",
            "cards_created",
            "username",
            "password",
            "email",
            "is_superuser"
        )
        model = models.User


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
            "creator",
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