from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class User(AbstractUser):
    pass

class Team(models.Model):
    owner = models.ForeignKey(User, related_name="team_owner", on_delete=models.CASCADE)
    member = models.ManyToManyField(User, related_name='member_teams', blank=True)

class Account(models.Model):
    username = models.CharField(max_length=30, blank=False, null=False, default="default_account")
    user = models.ManyToManyField(User, related_name='user_accounts')
    team = models.ForeignKey(Team, blank=True, null=True, related_name="team_accounts", on_delete=models.CASCADE)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username
        }

class Cell(models.Model):
    image = models.URLField(blank=False, null=False)
    account = models.ForeignKey(Account, related_name="account_grid", on_delete=models.CASCADE)
    position = models.IntegerField()

    def serialize(self):
        return {
            "image": self.image,
            # "account": self.account.username,
            # "position": self.position,
            "postId": self.post.pk
        }

    class Meta:
        ordering = ['-position']

class Post(models.Model):
    STATUSES = (
        ('backlog', 'Backlog'),
        ('inprogress', 'In Progress'),
        ('review', 'For Review'),
        ('approved', 'Approved'),
        ('scheduled', 'Scheduled'),
        ('posted', 'Posted'),
    )
    caption = models.TextField(blank=True, null=True, max_length=2200)
    hashtags = models.TextField(blank=True, null=True)
    schedule = models.DateTimeField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=30, choices=STATUSES ,default="backlog")
    cell = models.OneToOneField('Cell', on_delete=models.CASCADE, related_name="post")

    def serialize(self):
        return {
            #Create serial
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


