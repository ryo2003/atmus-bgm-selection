from django.urls import path
from .views import text_to_music_test, suggest_music

urlpatterns = [
    path("text-to-music-test/", text_to_music_test, name="text-to-music-test"),
    path("suggest-music/", suggest_music, name="suggest-music"),
]
