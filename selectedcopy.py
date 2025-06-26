# to be used when you want to copy only selected photos from the metadata.csv file

import os
import shutil
import csv

# === CONFIGURATION ===
csv_file = 'metadata.csv'           # CSV with filenames
media_folder = ''            # Folder where all photos are stored
output_folder = 'selected_photos'          # Destination folder to copy photos

# Create output folder if it doesn't exist
os.makedirs(output_folder, exist_ok=True)

# Read filenames from CSV
filenames = []
with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        filename = row['filename']
        filenames.append(filename.strip())

# Copy each file if it exists
copied = 0
missing = []

for filename in filenames:
    src_path = os.path.join(media_folder, filename)
    dst_path = os.path.join(output_folder, filename)
    
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        copied += 1
    else:
        missing.append(filename)

print(f"✅ Copied {copied} files to '{output_folder}'")
if missing:
    print(f"⚠️ {len(missing)} files not found:")
    for f in missing:
        print(f" - {f}")
