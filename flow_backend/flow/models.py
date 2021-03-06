from django.db import models
from django.contrib.auth.models import User as DjangoUser
from django.contrib.auth import get_user_model


class User(DjangoUser):

    preferences = models.TextField(null=True, blank=True) # In JSON format
    #  Atributes through symmetric relations:
    #   - board_roles  (Board)
    #   - assigned_to  (Card)
    #   - cards_created  (Card)

    #  Atributes inheritted from Django:
    #   - username  (CharField; unique)
    #   - password  (CharField; hashed)
    #   - email  (CharField)
    #   - first_name  (CharField)
    #   - last_name  (CharField)
    #   - is_superuser  (BooleanField)
        
    class Meta:
        app_label = "flow"

    def __str__(self):
        return self.username


class Board(models.Model):

    name = models.CharField(max_length=50)
    project_id = models.CharField(max_length=5)
    creation_date = models.DateTimeField(auto_now_add=True)
    last_edit_date = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    users = models.ManyToManyField(get_user_model(), through="BoardsToUsers", related_name="board_roles")
    #  Atributes through symmetric relations:
    #   - columns  (Column)
    #   - cards  (Card)
    #   - tags  (Tag)
        
    class Meta:
        app_label = "flow"

    def __str__(self):
        return self.name


class Column(models.Model):

    name = models.CharField(max_length=50)
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name="columns")
    is_private = models.BooleanField(default=True)
    description = models.TextField(blank=True, null=True)
    creation_date = models.DateTimeField(auto_now_add=True)
    last_edit_date = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    #  Atributes through symmetric relations:
    #   - cards  (Card)
        
    class Meta:
        app_label = "flow"

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=50)
    color = models.IntegerField()
    creator = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name="tags")
    creation_date = models.DateTimeField(auto_now_add=True)
    last_edit_date = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    #  Atributes through symmetric relations:
    #   - cards_labeled  (Card)
        
    class Meta:
        app_label = "flow"

    def __str__(self):
        return self.name


class Card(models.Model):
    
    name = models.CharField(max_length=250)
    local_id = models.IntegerField()
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name="cards")
    column = models.ForeignKey(Column, on_delete=models.CASCADE, related_name="cards")
    description = models.TextField(blank=True, null=True)
    creation_date = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="cards_created")
    last_edit_date = models.DateTimeField(auto_now=True)
    is_archived = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    task_list =  models.TextField(blank=False, null=False) # In JSON format
    assignees = models.ManyToManyField(get_user_model(), blank=True, null=True, related_name="assigned_to")
    tags = models.ManyToManyField(Tag, blank=True, related_name="cards_labeled")
    #  Atributes through symmetric relations: none
        
    class Meta:
        app_label = "flow"

    def __str__(self):
        return self.name


class BoardsToUsers(models.Model):
    OWNER = 3
    MEMBER = 2
    CONTRIBUTOR = 1
    BOARD_ROLES = (
        (OWNER, 'Owner'),
        (MEMBER, 'Member'),
        (CONTRIBUTOR, 'Contributor'),
    )
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    role = models.IntegerField(choices=BOARD_ROLES)

    class Meta:
        app_label = "flow"

