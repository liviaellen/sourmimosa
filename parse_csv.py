import csv
import json
import re

def extract_instagram_links(text):
    """Extract all Instagram links from a text field"""
    if not text or text == '-' or text == 'SOON':
        return []

    # Pattern to match Instagram URLs
    pattern = r'https://www\.instagram\.com/[^\s,"\n]+'
    links = re.findall(pattern, text)
    return [link.strip() for link in links if link]

def parse_hotels_and_resorts(csv_file):
    """Parse Hotels and Resorts CSV"""
    items = []

    with open(csv_file, 'r', encoding='utf-8') as f:
        # Skip the first row (it's header with different format)
        reader = csv.DictReader(f)

        for row in reader:
            if not row.get('Brand') or row.get('Brand') == '':
                continue

            # Extract all Instagram links from different columns
            all_links = []
            all_links.extend(extract_instagram_links(row.get('IG Post / Carousel', '')))
            all_links.extend(extract_instagram_links(row.get('IG Highlight', '')))
            all_links.extend(extract_instagram_links(row.get('IG Reels', '')))

            if all_links:  # Only add if there are valid links
                item = {
                    'id': f"hotel_{len(items) + 1}",
                    'brand': row.get('Brand', '').strip(),
                    'property': row.get('Property', '').strip(),
                    'city': row.get('City', '').strip(),
                    'category': 'Hotels & Resorts',
                    'brandCategory': row.get('Brand Category', '').strip(),
                    'instagramLinks': all_links,
                    'googleMaps': row.get('Google Maps', '').strip(),
                    'type': 'hotel'
                }
                items.append(item)

    return items

def parse_fnb_destinations(csv_file):
    """Parse F&B Destinations CSV"""
    items = []

    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)

        for row in reader:
            if not row.get('Venue') or row.get('Venue') == '':
                continue

            link = row.get('Link', '').strip()
            if link and link != '-':
                # Count Michelin stars
                venue_name = row.get('Venue', '')
                michelin_stars = venue_name.count('⭐️')

                item = {
                    'id': f"fnb_{len(items) + 1}",
                    'venue': venue_name.strip(),
                    'city': row.get('City', '').strip(),
                    'category': 'F&B Destinations',
                    'type': row.get('Type', '').strip(),  # Restaurant or Stay
                    'level': row.get('Level', '').strip(),  # Awesome or Fine
                    'michelinStars': michelin_stars,
                    'instagramLinks': [link],
                    'googleMaps': row.get('Google Maps', '').strip()
                }
                items.append(item)

    return items

def parse_beyond_hotels_fnb(csv_file):
    """Parse Beyond Hotels and F&B CSV"""
    items = []

    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)

        for row in reader:
            if not row.get('Brand / Institution') or row.get('Brand / Institution') == '':
                continue

            link = row.get('Link', '').strip()
            if link and link != '-':
                item = {
                    'id': f"beyond_{len(items) + 1}",
                    'brand': row.get('Brand / Institution', '').strip(),
                    'item': row.get('Item', '').strip(),
                    'city': row.get('City', '').strip(),
                    'category': 'Beyond Hotels & F&B',
                    'type': row.get('Type', '').strip(),  # Beauty/Grooming, Entertainment, Fashion, Tech, Travel
                    'instagramLinks': [link],
                    'googleMaps': row.get('Google Maps', '').strip()
                }
                items.append(item)

    return items

def main():
    # Parse all three CSV files
    hotels = parse_hotels_and_resorts('Sourmimosa Portfolio - Hotels and Resorts.csv')
    fnb = parse_fnb_destinations('Sourmimosa Portfolio - F&B Destinations.csv')
    beyond = parse_beyond_hotels_fnb('Sourmimosa Portfolio - Beyond Hotels and F&B.csv')

    # Combine all items
    all_items = hotels + fnb + beyond

    # Create output data structure
    output = {
        'portfolio': all_items,
        'stats': {
            'totalItems': len(all_items),
            'hotels': len(hotels),
            'fnb': len(fnb),
            'beyond': len(beyond)
        }
    }

    # Write to JSON file
    with open('portfolio_data.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"✅ Processed {len(all_items)} portfolio items")
    print(f"   - Hotels & Resorts: {len(hotels)}")
    print(f"   - F&B Destinations: {len(fnb)}")
    print(f"   - Beyond Hotels & F&B: {len(beyond)}")
    print(f"\n📄 Data saved to portfolio_data.json")

if __name__ == '__main__':
    main()
