from django.db import models
from django.conf import settings
from django.urls import reverse


class Micropost(models.Model):
    content = models.TextField(max_length=140)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='microposts'
    )
    picture = models.ImageField(upload_to='microposts/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.name}: {self.content[:50]}..."

    def get_absolute_url(self):
        return reverse('microposts:detail', kwargs={'pk': self.pk})
