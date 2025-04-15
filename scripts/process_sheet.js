const Papa = require('papaparse');
const fs = require('node:fs/promises');

async function processSheet() {
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    const response = await fetch(csvUrl);
    if (!response.ok) throw new Error(`Failed to fetch CSV: ${response.statusText}`);

    const csvText = await response.text();
    const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true }).data;

    const tagCounts = {};
    const gameCounts = {};

    parsed.forEach(row => {
        const game = row['Game (Optional)']?.trim();
        const tags = row['Tags (Optional, comma-separated)']?.split(',').map(t => t.trim());

        if (game) gameCounts[game] = (gameCounts[game] || 0) + 1;
        if (tags) {
            tags.forEach(tag => {
                if (tag) tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        }
    });

    const trendingTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([tag]) => tag);

    const trendingGames = Object.entries(gameCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([game]) => game);

    await fs.writeFile('community-tags.json', JSON.stringify(trendingTags, null, 2));
    await fs.writeFile('community-games.json', JSON.stringify(trendingGames, null, 2));

    console.log('Successfully updated community data.');
}

processSheet().catch(err => {
    console.error('Error processing sheet:', err);
    process.exit(1);
});
