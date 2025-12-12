const fs = require('fs');
const path = require('path');
const https = require('https');
const { parse } = require('csv-parse/sync');

// CONFIGURATION
const SPREADSHEET_ID = '1LhAH8zH9GEWe95GztzXR3CYkDFy0tP8TUzEnPoIG0jE';

// Instructions to find GIDs:
// Open your Google Sheet, click on the specific tab.
// Look at the URL in your browser address bar.
// It will look like: .../edit#gid=123456789
// The number after 'gid=' is the ID.

const TABS = [
  {
    gid: '0', // "Hotels" Tab (usually the first one)
    category: 'Hotels & Resorts',
    type: 'hotel',
    mapping: (row) => ({
      brand: row['Brand'],
      property: row['Property'],
      city: row['City'],
      brandCategory: row['Brand Category'],
      instagramLinks: [
        row['IG Post / Carousel'],
        row['IG Highlight'],
        row['IG Reels']
      ].filter(Boolean), // Remove empty links
      googleMaps: row['Google Maps']
    })
  },
  {
    gid: '1172771631', // "F&B" Tab (from your link)
    category: 'F&B Destinations',
    type: 'fnb', // Will be overridden if row has specific type
    mapping: (row) => ({
      brand: row['Venue'], // F&B tab uses "Venue" column
      property: row['Venue'],
      city: row['City'],
      type: row['Type'] ? row['Type'].toLowerCase() : 'fnb', // Use CSV type (e.g. Restaurant) or fallback
      instagramLinks: [
        row['Link']
      ].filter(Boolean),
      googleMaps: row['Google Maps']
    })
  },
  {
    gid: '1163819504', // "Beyond" Tab (from your link)
    category: 'Beyond Hotels & F&B',
    type: 'beyond',
    mapping: (row) => ({
      brand: row['Brand / Institution'],
      property: row['Item'],
      city: row['City'],
      type: 'beyond',
      instagramLinks: [
        row['Link']
      ].filter(Boolean),
      googleMaps: row['Google Maps']
    })
  }
];

const OUTPUT_FILE = path.join(__dirname, '../src/data/portfolio.json');

async function fetchCSV(gid) {
  if (gid === 'YOUR_BEYOND_TAB_GID_HERE') {
    console.warn('⚠️ Skipping "Beyond" tab: GID not configured in scripts/update-portfolio.cjs');
    return null;
  }

  const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${gid}`;

  return new Promise((resolve, reject) => {
    const makeRequest = (requestUrl) => {
      https.get(requestUrl, (res) => {
        // Handle Redirects (301, 302, 307)
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          console.log(`   ↪ Redirecting to ${res.headers.location.substring(0, 50)}...`);
          makeRequest(res.headers.location);
          return;
        }

        if (res.statusCode !== 200) {
          reject(new Error(`Failed to fetch CSV (GID: ${gid}). Status: ${res.statusCode}`));
          return;
        }
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => resolve(data));
      }).on('error', (err) => reject(err));
    };

    makeRequest(url);
  });
}

function normalizeLinks(links) {
  if (!links) return [];
  const normalized = [];
  links.forEach(link => {
    if (!link) return;
    // Handle multiple links in one cell (separated by newline or space)
    const split = link.split(/[\n\s]+/).filter(l => l.startsWith('http'));
    normalized.push(...split);
  });
  return normalized;
}

async function main() {
  console.log('🚀 Starting Portfolio Data Update...');
  const portfolio = [];
  let idCounter = 1;

  for (const tab of TABS) {
    try {
      console.log(`📥 Fetching ${tab.category}...`);
      const csvData = await fetchCSV(tab.gid);

      if (!csvData) continue;

      const records = parse(csvData, {
        columns: true, // Auto-detect headers
        skip_empty_lines: true,
        trim: true
      });

      console.log(`   Found ${records.length} items.`);

      records.forEach((row, index) => {
        // Skip if essential data is missing
        if ((!row['Property'] && !row['Venue']) || !row['City']) return;

        const mapped = tab.mapping(row);

        portfolio.push({
          id: `${tab.type}_${idCounter++}`,
          brand: mapped.brand || '',
          property: mapped.property || '',
          city: mapped.city || '',
          category: tab.category,
          brandCategory: mapped.brandCategory || '', // Optional
          type: mapped.type || tab.type,
          instagramLinks: normalizeLinks(mapped.instagramLinks),
          googleMaps: mapped.googleMaps || ''
        });
      });

    } catch (error) {
      console.error(`❌ Error processing ${tab.category}:`, error.message);
    }
  }

  // Preserve existing stats if we want/need, or just overwrite?
  // Our previous data structure had 'stats' at the root.
  // We should create the full JSON structure.

  const finalData = {
    portfolio: portfolio,
    stats: {
      hotels: portfolio.filter(i => i.category === 'Hotels & Resorts').length,
      cities: new Set(portfolio.map(i => i.city)).size,
      countries: 30 // Hardcoded or calculated if we had country data
    }
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalData, null, 2));
  console.log(`✅ Successfully wrote ${portfolio.length} items to ${OUTPUT_FILE}`);
}

main();
