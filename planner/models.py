from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class User(AbstractUser):
    pass

class Account(models.Model):
    username = models.CharField(max_length=30, blank=False, null=False)
    owner = models.ForeignKey('User', related_name='owner_accounts', blank=True, on_delete=models.CASCADE)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "owner": self.owner.username
        }
    
    def __str__(self):
        return self.username

class Team(models.Model):
    account = models.OneToOneField('Account', related_name='team', on_delete=models.CASCADE)
    member = models.ManyToManyField('User', related_name='member_teams', blank=True)

    def serialize(self):

        return [
            {
                "id": mem.id,
                "username": mem.username,
                "email": mem.email,
                "owner": 1
            } if mem.username == self.account.owner.username
            else {
                "id": mem.id,
                "username": mem.username,
                "email": mem.email,
                "owner": 0
            }
            for mem in self.member.all()
        ]
    
    def __str__(self):
        return self.account.username

@receiver(post_save, sender=Account)
def create_team_account(sender, instance, created, **kwargs):
    if created:
        Team.objects.create(account=instance)

@receiver(post_save, sender=Account)
def save_team_account(sender, instance, **kwargs):
    instance.team.save()
    instance.team.member.add(instance.owner)


def upload_to(instance, filename):
    return 'planner/{filename}'.format(filename=filename)

class Cell(models.Model):
    # image = models.ImageField(upload_to=upload_to, default='planner/default.jpg')
    image = models.URLField(blank=False, null=False)
    account = models.ForeignKey('Account', related_name="account_grid", on_delete=models.CASCADE)
    position = models.IntegerField()

    def serialize(self):
        return {
            "image": self.image,
            # "image": self.image.url,
            "postId": self.post.pk
        }

    class Meta:
        ordering = ['-position']

class Post(models.Model):
    caption = models.TextField(default='', blank=True, max_length=2200)
    hashtags = models.TextField(default='', blank=True)
    schedule = models.DateTimeField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=30, default="backlog")
    cell = models.OneToOneField('Cell', on_delete=models.CASCADE, related_name="post")

    def serialize(self):
        return {
            # "image": self.cell.image.url,
            "image": self.cell.image,
            "caption": self.caption,
            "hashtags": self.hashtags,
            "schedule": self.schedule,
            "timestamp": self.timestamp,
            "status": self.status
        }

@receiver(post_save, sender=Cell)
def create_cell_post(sender, instance, created, **kwargs):
    if created:
        Post.objects.create(cell=instance)

@receiver(post_save, sender=Cell)
def save_cell_post(sender, instance, **kwargs):
    instance.post.save()

class HashtagGroups(models.Model):
    caption = models.TextField(blank=False, null=False, max_length=2200)
    account = models.ForeignKey('Account', related_name="account_hashtags", on_delete=models.CASCADE)

class Comment(models.Model):
    username = models.CharField(max_length=30, blank=False, null=False)
    comment = models.TextField(blank=False, null=False, max_length=560)
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name="post_comment")

    def serialize(self):
        return {
            "id": self.id,
            "postId": self.post.id,
            "username": self.username,
            "comment": self.comment
        }
    
    def __str__(self):
        return self.username + ": " + self.comment

    class Meta:
        ordering = ['-id']



