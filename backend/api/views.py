import openai
import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from PIL import Image
import base64
from io import BytesIO
from dotenv import load_dotenv
import os

load_dotenv()
# Set your OpenAI API key
OPENAI_API_KEY = os.getenv("OPENAI_API")

import openai
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# OpenAI API Key
openai.api_key = OPENAI_API_KEY

@csrf_exempt
def suggest_music(request):
    if request.method == "POST":
        try:
            # Parse the request body
            data = json.loads(request.body)
            text_description = data.get("text", None)
            image_base64 = data.get("image", None)

            # Debugging logs
            print("✅ Received Request")
            print("Text:", text_description)
            print("Image:", "Yes" if image_base64 else "No")

            # if text_description == "":
            #     print("❌ Text description is required.")
            #     return JsonResponse({"error": "Text description is required."}, status=400)
            
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {OPENAI_API_KEY}"
            }

            format = """
        
               {
                    title: data.background_music[0].title || "Generated Music",
                    artist: data.background_music[0].artist || "AI Composer",
                    url: data.background_music[0].url || "",  // If URL isn't provided, this remains an empty string
                    mood: data.background_music[0].mood || "Unknown",
                    genre: data.background_music[0].genre || "Unknown"
                }
        
            """

            # Construct OpenAI prompt
            prompt = f"Given the following description and image, suggest suitable background music:\n{text_description}. Choose 3 songs that exists with over 1000000 views and for URL, search the music on youtube.  Follow the format below:\n{format}. Just return a json format string."

            # Call OpenAI API
            messages = [
                {"role": "system", "content": "You are a music recommendation assistant."},
                {"role": "user", "content": prompt}
            ]
            if image_base64:
                messages.append({"role": "user", "content": {"type": "image", "image": image_base64}})

            # Payload with the Base64 encoded image and the query
            payload = {
                "model": "gpt-4o-mini",
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": prompt
                            }
                        ]
                    }
                ],
                "max_tokens": 300
            }

            # Only add the image part if image_base64 has a value.
            if image_base64:
                payload["messages"][0]["content"].append({
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{image_base64}"
                    }
                })

            # Make a request to the OpenAI API
            response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

            if response.status_code == 200:
                # Get the raw content
                response_json = response.json()
                # Extract the content field which contains the JSON-like string

                message_content = response_json['choices'][0]['message']['content']

                # Parse the remaining part as JSON
                print(message_content.replace('json', '', 1).strip()[3:-3])
                music_suggestion =  json.loads(message_content.replace('json', '', 1).strip()[3:-3])
            else:
                return f"Error: {response.status_code}, {response.text}"
            # Extract response
            #music_suggestion = response["choices"][0]["message"]["content"]

            print("✅ Music Suggestion:", music_suggestion)

            return JsonResponse( music_suggestion)

        except json.JSONDecodeError:
            print("❌ JSON Error: Invalid request format")
            return JsonResponse({"error": "Invalid JSON format"}, status=400)
        except Exception as e:
            print(f"❌ Server Error: {str(e)}")
            return JsonResponse({"error": f"Server error: {str(e)}"}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)




@csrf_exempt
def text_to_music_test(request):
    data = json.loads(request.body)
    text_input = data.get("text")
    print(text_input)
    print(request.method)
    """Returns a hardcoded JSON response for testing."""
    return JsonResponse({
        "title": "Peaceful Sunset",
        "artist": "Nature Sounds",
        "music_url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "mood": "Calm",
        "genre": "Ambient",
        "recommendations": [
            {
            "title": "Ocean Waves",
            "artist": "Relaxing Sounds",
            "mood": "Serene"
            },
            {
            "title": "Mountain Air",
            "artist": "Nature's Best",
            "mood": "Peaceful"
            }
        ]
    })

