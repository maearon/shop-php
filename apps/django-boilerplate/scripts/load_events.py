import json
from pathlib import Path
from django.utils.dateparse import parse_datetime
from apps.events.models import Event

def run():
    file_path = Path(__file__).parent / "events.json"
    with open(file_path, "r") as f:
        data = json.load(f)

    for entry in data:
        Event.objects.create(
            title=f"Event {entry['id']}",
            description=entry["description"],
            location="Imported",
            latitude=entry["location"]["latitude"],
            longitude=entry["location"]["longitude"],
            timestamp=parse_datetime(entry["timestamp"]),
        )
    print("✅ Successfully inserted events.")
