from django.db import models


class User(models.Model):
    
    username = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    firstname = models.CharField(max_length=50)
    surname = models.CharField(max_length=50, null=True, blank=True)
    lastname = models.CharField(max_length=50, null=True, blank=True)
    boards = models.ArrayField(models.ForeignKey(Board, on_delete=models.CASCADE))

    def __str__(self):
        return self.username


class Tag(models.Model):
    name = models.CharField(max_length=50)
    board = models.ForeignKey(Board)
    color = models.IntegerField()
    creation_date = models.DateTimeField(auto_now_add=True)
    last_edit_date = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(User)

    def __str__(self):
        return self.name


class Task(models.Model):
    task_name = models.CharField(max_length=150)
    is_done = models.BooleanField(default=False)
    card = models.ForeignKey(Card)
    creation_date = models.DateTimeField(auto_now_add=True)
    last_edit_date = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(User)

    def __str__(self):
        return self.task


class Column(models.Model):

    name = models.CharField(max_length=50)
    board = models.ForeignKey(Board)
    is_private = models.BooleanField(default=True)
    description = models.TextField(blank=True)
    cards = models.ArrayField(models.ForeignKey(Card, on_delete=models.CASCADE))
    creation_date = models.DateTimeField(auto_now_add=True)
    last_edit_date = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(User)

    def __str__(self):
        return self.name


class Card(models.Model):
    
    name = models.CharField(max_length=250)
    local_id = models.IntegerField()
    board = models.ForeignKey(Board)
    column = models.ForeignKey(Column)
    description = models.TextField(blank=True)
    creation_date = models.DateTimeField(auto_now_add=True)
    last_edit_date = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(User)
    is_archived = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=True)
    tags = models.ArrayField(models.ForeignKey(Tag))
    assignees = models.ArrayField(models.ForeignKey(User))
    task_list = models.ArrayField(models.ForeignKey(Task, on_delete=models.CASCADE))

    def __str__(self):
        return self.name


class Board(models.Model):

    name = models.CharField(max_length=50)
    project_id = models.CharField(max_length=5)
    tags = models.ArrayField(models.ForeignKey(Tag), on_delete=models.CASCADE)
    columns = models.ArrayField(models.ForeignKey(Column), on_delete=models.CASCADE)
    cards = models.ArrayField(models.ForeignKey(Card), on_delete=models.CASCADE)
    users = models.ArrayField(models.ForeignKey(User))
    creation_date = models.DateTimeField(auto_now_add=True)
    last_edit_date = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(User)

    def __str__(self):
        return self.name

