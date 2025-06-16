from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
import hashlib


class User(AbstractUser): # => default accounts_user accounts app name, _user model name
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    # Optional fields from your original model
    # admin = models.BooleanField(default=False)
    activated = models.BooleanField(default=False)
    # activated_at = models.DateTimeField(null=True, blank=True)
    # displayName = models.TextField()
    # avatarUrl = models.TextField(blank=True, null=True)
    # bio = models.TextField(blank=True, null=True)
    # googleId = models.TextField(blank=True, null=True)
    # refresh_token = models.CharField(max_length=255, blank=True, null=True)
    # refresh_token_expiration_at = models.DateTimeField(blank=True, null=True)
    # remember_digest = models.CharField(max_length=255, blank=True, null=True)
    # activation_digest = models.CharField(max_length=255, blank=True, null=True)
    # reset_digest = models.CharField(max_length=255, blank=True, null=True)
    # reset_sent_at = models.DateTimeField(blank=True, null=True)
    # password_digest = models.CharField(max_length=255, blank=True, null=True)
    # passwordHash = models.TextField(blank=True, null=True)

    # Time metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'name']

    class Meta:
        # db_table = 'users'  # 👈 custom table name
        ordering = ['-created_at']

    def __str__(self):
        return self.name or self.email

    def get_absolute_url(self):
        return reverse('accounts:user_detail', kwargs={'pk': self.pk})

    def gravatar_url(self, size=80):
        """Generate Gravatar URL for user's email"""
        gravatar_id = hashlib.md5(self.email.lower().encode('utf-8')).hexdigest()
        return f"https://secure.gravatar.com/avatar/{gravatar_id}?s={size}"

    def microposts_count(self):
        return self.microposts.count()

    def following_count(self):
        return self.active_relationships.count()

    def followers_count(self):
        return self.passive_relationships.count()

    def follow(self, other_user):
        """Follow another user"""
        if not self.following(other_user):
            from apps.relationships.models import Relationship
            Relationship.objects.create(follower=self, followed=other_user)

    def unfollow(self, other_user):
        """Unfollow another user"""
        from apps.relationships.models import Relationship
        Relationship.objects.filter(follower=self, followed=other_user).delete()

    def following(self, other_user):
        """Check if following another user"""
        from apps.relationships.models import Relationship
        return Relationship.objects.filter(follower=self, followed=other_user).exists()

    def feed(self):
        """Get microposts from followed users and own microposts"""
        from apps.microposts.models import Micropost
        following_ids = self.active_relationships.values_list('followed_id', flat=True)
        return Micropost.objects.filter(
            models.Q(user_id__in=following_ids) | models.Q(user=self)
        ).select_related('user').order_by('-created_at')
