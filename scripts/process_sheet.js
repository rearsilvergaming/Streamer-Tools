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
    
    // Parse the CSV with minimal processing to see what we're getting
    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true
    }).data;

    console.log("Parsed headers:", Object.keys(parsed[0] || {}));
    console.log("Total rows in parsed data:", parsed.length);
    
    // Sample a few rows to see what's happening
    console.log("Sample row with timestamp:", 
      parsed.find(row => row["Timestamp"] && row["Timestamp"].trim() !== ""));
    console.log("Sample row without timestamp:", 
      parsed.find(row => !row["Timestamp"] || row["Timestamp"].trim() === ""));

    const tagCounts = {};
    const gameCounts = {};
    let totalUsesCount = 0;

    parsed.forEach((row) => {
      // Process every row regardless of timestamp
      if (row) {
        // Count this as a use
        totalUsesCount++;
        
        // Process game data
        const game = row["Game (Optional)"];
        if (game && game.trim() !== "") {
          gameCounts[game] = (gameCounts[game] || 0) + 1;
        }
        
        // Process tags data
        const tagsStr = row["Tags (Optional, comma-separated)"];
        if (tagsStr && tagsStr.trim() !== "") {
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
