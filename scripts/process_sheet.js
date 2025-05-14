const Papa = require("papaparse");
const fs = require("node:fs/promises");

async function processSheet() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

  try {
    const response = await fetch(csvUrl);

    if (!response.ok) {
      console.error(
        `Failed to fetch CSV: ${response.status} ${response.statusText}`
      );
      console.error(`CSV URL: ${csvUrl}`);
      throw new Error(
        `Failed to fetch CSV. Status: ${response.status}, Text: ${response.statusText}, URL: ${csvUrl}`
      );
    }

    const csvText = await response.text();
    
    // Let's try parsing without any header transformation first
    const rawParsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    }).data;
    
    console.log("Raw parsed headers:", Object.keys(rawParsed[0] || {}));
    console.log("Raw parsed row count:", rawParsed.length);
    
    // Now let's count all entries in the raw data
    let rawGameCount = 0;
    let rawTagCount = 0;
    let rawSessionCount = 0;
    
    // Find the exact header names from the raw data
    const gameHeader = Object.keys(rawParsed[0] || {}).find(h => h.includes("Game"));
    const tagsHeader = Object.keys(rawParsed[0] || {}).find(h => h.includes("Tags"));
    const sessionHeader = Object.keys(rawParsed[0] || {}).find(h => h.includes("Session"));
    
    console.log("Exact headers from raw data:", { gameHeader, tagsHeader, sessionHeader });
    
    // Count entries using the exact headers
    rawParsed.forEach(row => {
      if (row[gameHeader] && row[gameHeader].trim()) rawGameCount++;
      if (row[tagsHeader] && row[tagsHeader].trim()) rawTagCount++;
      if (row[sessionHeader] && row[sessionHeader].trim()) rawSessionCount++;
    });
    
    console.log("Raw counts:", { rawGameCount, rawTagCount, rawSessionCount });
    
    // Now parse with our standardized headers
    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => {
        const trimmedHeader = header.trim();
        
        if (trimmedHeader.includes("Game")) {
          return "Game (Optional)";
        }
        if (trimmedHeader.includes("Tags")) {
          return "Tags (Optional, comma-separated)";
        }
        if (trimmedHeader.includes("Session")) {
          return "Session ID (Optional)";
        }
        if (trimmedHeader.includes("Timestamp")) {
          return "Timestamp";
        }
        return trimmedHeader;
      },
    }).data;

    console.log("Transformed headers:", Object.keys(parsed[0] || {}));
    console.log("Transformed parsed row count:", parsed.length);
    
    // Count entries in the transformed data
    let transformedGameCount = 0;
    let transformedTagCount = 0;
    let transformedSessionCount = 0;
    
    parsed.forEach(row => {
      if (row["Game (Optional)"] && row["Game (Optional)"].trim()) transformedGameCount++;
      if (row["Tags (Optional, comma-separated)"] && row["Tags (Optional, comma-separated)"].trim()) transformedTagCount++;
      if (row["Session ID (Optional)"] && row["Session ID (Optional)"].trim()) transformedSessionCount++;
    });
    
    console.log("Transformed counts:", { transformedGameCount, transformedTagCount, transformedSessionCount });

    const tagCounts = {};
    const gameCounts = {};
    let totalUsesCount = 0;

    // Use the raw parsed data with exact headers to ensure we get all entries
    rawParsed.forEach((row) => {
      if (row) {
        const sessionId = row[sessionHeader];
        if (sessionId && sessionId.trim()) {
          totalUsesCount++;
        }

        const game = row[gameHeader];
        if (game && game.trim()) {
          gameCounts[game.trim()] = (gameCounts[game.trim()] || 0) + 1;
        }

        const tagsStr = row[tagsHeader];
        if (tagsStr && tagsStr.trim()) {
          const tags = tagsStr
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

          tags.forEach((tag) => {
            if (tag) tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        }
      }
    });

    const trendingTags = Object.entries(tagCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 10)
      .map(([tag, count]) => ({ name: tag, count }));

    const trendingGames = Object.entries(gameCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 5)
      .map(([game, count]) => ({ name: game, count }));

    console.log("Trending Tags:", trendingTags);
    console.log("Trending Games:", trendingGames);
    console.log("Total Uses (counting all submissions):", totalUsesCount);
    
    // Calculate total game counts for verification
    const totalGameCount = Object.values(gameCounts).reduce((sum, count) => sum + count, 0);
    console.log("Total game entries:", totalGameCount);

    // Ensure the 'docs' directory exists before writing files.
    try {
      await fs.mkdir("docs", { recursive: true });
    } catch (mkdirErr) {
      console.error("Error creating 'docs' directory:", mkdirErr);
      throw mkdirErr;
    }

    await fs.writeFile(
      "docs/community-tags.json",
      JSON.stringify(trendingTags, null, 2)
    );
    await fs.writeFile(
      "docs/community-games.json",
      JSON.stringify(trendingGames, null, 2)
    );
    await fs.writeFile(
      "docs/total-uses.json",
      JSON.stringify({ total: totalUsesCount }, null, 2)
    );

    console.log("Successfully updated community data.");
  } catch (err) {
    console.error("Error processing sheet:", err);
    process.exit(1);
  }
}

processSheet();
