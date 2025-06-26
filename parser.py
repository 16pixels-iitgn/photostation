# Download this file separately and use with the exported chat to parse the chat and extract the photos and their metadata.
# Preferred to save the names of contributors so manual parsing is not required.
import re
import csv
from datetime import datetime

# Input and Output file paths
chat_file = 'whatsapp_chat.txt'
output_csv = 'metadata.csv'

# Regex pattern for WhatsApp message with media
message_pattern = re.compile(
    r'(\d{2}/\d{2}/\d{2}),\s+(\d{1,2}:\d{2})[^\-]+-\s+(.*?):\s+(IMG[^:\s]+?\.(?:jpg|jpeg|png|heic|HEIC)) \(file attached\)', 
    re.IGNORECASE
)

# Read chat file
with open(chat_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Store extracted entries
entries = []
i = 0
photo_id = 1

while i < len(lines):
    line = lines[i].strip()
    match = message_pattern.match(line)
    
    if match:
        date_str, time_str, sender, filename = match.groups()
        
        # Convert date format from DD/MM/YY to DD-MM-YYYY
        date_obj = datetime.strptime(date_str, "%d/%m/%y")
        formatted_date = date_obj.strftime("%d-%m-%Y")

        # Look ahead to next line for a possible description (not a new message line)
        title = ""
        description = ""
        if i + 1 < len(lines):
            next_line = lines[i + 1].strip()
            if not re.match(r'\d{2}/\d{2}/\d{2},', next_line):
                description = next_line
                i += 1  # Consume this extra line as it's part of the media entry
        
        entries.append([
            photo_id,
            filename,
            sender,
            title,
            description,
            formatted_date
        ])
        photo_id += 1
    
    i += 1

# Write to CSV
with open(output_csv, 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['id', 'filename', 'photographer(name/contact no.)', 'title', 'description', 'date'])
    writer.writerows(entries)

print(f"✅ Exported {len(entries)} photo entries to {output_csv}")
