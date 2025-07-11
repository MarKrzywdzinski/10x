import requests

# Wprowadź swoje dane
access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmaHFsdmh3dHJ3cWF2Y3Bwd3VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyNzM3OTIsImV4cCI6MjA2Njg0OTc5Mn0.CNnvXMa-ts8W9cd32b8-f1BkYcMLxvtZDMIV7f_dHM4"
project_ref = "ifhqlvhwtrwqavcppwua"

url = f"https://api.supabase.com/v1/projects/{project_ref}/config/auth"
headers = {
    "Authorization": f"Bearer {access_token}"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()
    for key, value in data.items():
        if key.startswith("rate_limit_"):
            print(f"{key}: {value}")
else:
    print(f"Błąd: {response.status_code}")
    print(response.text)
