from rest_framework import serializers
from . import models


class CardSerializer(serializers.ModelSerializer):

    class Meta:
        fields = (
            "name",
            "local_id",
            "board",
            "column",
            "description",
            "creation_date",
            "last_edit_date",
            "creator",
            "is_archived",
            "is_deleted",
            "tags",
            "assignees",
            "task_list"
        )
        model = models.Card