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
    
    // Parse the CSV with explicit handling of blank rows
    const parsedData = Papa.parse(csvText, {
      header: false,
      skipEmptyLines: true, // Skip completely empty rows
    }).data;
    
    // The first row contains the headers
    const headers = parsedData[0];
    console.log("CSV headers:", headers);
    
    // Find the index of each column we care about
    const timestampIndex = headers.findIndex(h => h.trim().includes("Timestamp"));
    const gameIndex = headers.findIndex(h => h.trim().includes("Game"));
    const tagsIndex = headers.findIndex(h => h.trim().includes("Tags"));
    const sessionIdIndex = headers.findIndex(h => h.trim().includes("Session"));
    
    console.log("Column indices:", {
      timestampIndex,
      gameIndex,
      tagsIndex,
      sessionIdIndex
    });
    
    // Process the data rows (skip the header row)
    const tagCounts = {};
    const gameCounts = {};
    let totalUsesCount = 0;
    let rowsWithTimestamp = 0;
    let rowsWithGame = 0;
    let rowsWithTags = 0;
    
    for (let i = 1; i < parsedData.length; i++) {
      const row = parsedData[i];
      
      // Skip rows that don't have enough columns
      if (row.length <= Math.max(timestampIndex, gameIndex, tagsIndex, sessionIdIndex)) {
        console.log(`Skipping row ${i} - insufficient columns:`, row);
        continue;
      }
      
      // Check if this row has a timestamp
      const hasTimestamp = row[timestampIndex] && row[timestampIndex].trim() !== "";
      if (hasTimestamp) rowsWithTimestamp++;
      
      // Process session ID
      const sessionId = row[sessionIdIndex] && row[sessionIdIndex].trim();
      if (sessionId) {
        totalUsesCount++;
      }
      
      // Process game
      const game = row[gameIndex] && row[gameIndex].trim();
      if (game) {
        rowsWithGame++;
        gameCounts[game] = (gameCounts[game] || 0) + 1;
      }
      
      // Process tags
      const tagsStr = row[tagsIndex] && row[tagsIndex].trim();
      if (tagsStr) {
        rowsWithTags++;
        const tags = tagsStr
          .split(",")
          .map(t => t.trim())
          .filter(Boolean);
          
        tags.forEach(tag => {
          if (tag) tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    }
    
    console.log("Total rows processed:", parsedData.length - 1); // Subtract 1 for header row
    console.log("Rows with timestamp:", rowsWithTimestamp);
    console.log("Rows with game:", rowsWithGame);
    console.log("Rows with tags:", rowsWithTags);
    
    // Show all games and their counts
    console.log("All games and their counts:");
    const allGames = Object.entries(gameCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .map(([game, count]) => ({ name: game, count }));
    
    allGames.forEach(game => {
      console.log(`${game.name}: ${game.count}`);
    });
    
    // Calculate total game counts for verification
    const totalGameCount = Object.values(gameCounts).reduce((sum, count) => sum + count, 0);
    console.log("Total game entries:", totalGameCount);

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
