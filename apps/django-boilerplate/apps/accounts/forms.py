from django import forms
from django.contrib.auth.forms import UserCreationForm as BaseUserCreationForm
from .models import User


class UserCreationForm(BaseUserCreationForm):
    email = forms.EmailField(required=True)
    name = forms.CharField(max_length=50, required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'name', 'password1', 'password2')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        user.name = self.cleaned_data['name']
        if commit:
            user.save()
        return user


class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('name', 'email')
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
        }
