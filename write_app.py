import re

# Read current app.js
with open('/home/user/coado/app.js', 'r') as f:
    content = f.read()

print(f"Current length: {len(content)} chars, {len(content.splitlines())} lines")
