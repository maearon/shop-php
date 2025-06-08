from django import forms
from .models import Micropost


class MicropostForm(forms.ModelForm):
    class Meta:
        model = Micropost
        fields = ('content', 'picture')
        widgets = {
            'content': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': "What's happening?",
                'maxlength': 140
            }),
            'picture': forms.FileInput(attrs={'class': 'form-control'})
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['content'].required = True
        self.fields['picture'].required = False
