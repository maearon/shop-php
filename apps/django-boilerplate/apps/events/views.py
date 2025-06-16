# events/views.py
from django.http import JsonResponse
import json
from pathlib import Path

def event_list(request):
    severity_filter = request.GET.get('severity')
    with open(Path(__file__).resolve().parent.parent / 'events.json') as f:
        events = json.load(f)

    if severity_filter:
        events = [e for e in events if e["severity"] == severity_filter]
    
    return JsonResponse(events, safe=False)
