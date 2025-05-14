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

    // First, let's examine the raw CSV headers
    const firstLine = csvText.split('\n')[0];
    console.log("Raw CSV headers:", firstLine);

    // Parse the CSV with a custom header transform
    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => {
        // Trim any whitespace
        const trimmedHeader = header.trim();
        
        // Map headers to consistent names regardless of spaces or exact format
        if (trimmedHeader.includes("Game")) {
          return "Game (Optional)";
        }
        if (trimmedHeader.includes("Tags")) {
          return "Tags (Optional, comma-separated)";
        }
        if (trimmedHeader.includes("Session ID")) {
          return "Session ID (Optional)";
        }
        if (trimmedHeader.includes("Timestamp")) {
          return "Timestamp";
        }
        return trimmedHeader;
      },
    }).data;

    console.log("Transformed headers:", Object.keys(parsed[0] || {}));
    
    // Check a sample row with timestamp to verify data access
    const rowWithTimestamp = parsed.find(row => row["Timestamp"] && row["Timestamp"].trim() !== "");
    if (rowWithTimestamp) {
      console.log("Sample row with timestamp - Game:", rowWithTimestamp["Game (Optional)"]);
      console.log("Sample row with timestamp - Tags:", rowWithTimestamp["Tags (Optional, comma-separated)"]);
      console.log("Sample row with timestamp - Session ID:", rowWithTimestamp["Session ID (Optional)"]);
    }

    const tagCounts = {};
    const gameCounts = {};
    let totalUsesCount = 0;

    parsed.forEach((row) => {
      // Check if row is defined and not null
      if (row) {
        const sessionId = row["Session ID (Optional)"];
        if (sessionId) {
          totalUsesCount++;
        }

        const game = row["Game (Optional)"];
        const tagsStr = row["Tags (Optional, comma-separated)"];
        const tags = tagsStr
          ?.split(",")
          .map((t) => t.trim())
          .filter(Boolean);

        if (game) gameCounts[game] = (gameCounts[game] || 0) + 1;
        if (tags && tags.length > 0) {
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
