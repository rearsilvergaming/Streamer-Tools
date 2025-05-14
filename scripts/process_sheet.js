const Papa = require("papaparse");
const fs = require("node:fs/promises");

async function processSheet() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const csvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQPTO-Vj3MsRi-oSC6gTl-G7eUFB-U-AT2-NFYbsRoRtECyUzcP1luYvcIy7nOBCp724p8UE1WX9dhu/pub?output=csv&cachebust=" +
    Date.now();

  try {
    const response = await fetch(csvUrl);
    if (!response.ok)
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);

    const csvText = await response.text();

    console.log("Fetched CSV Data:", csvText);

    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    }).data;

    const tagCounts = {};
    const gameCounts = {};
    let totalUsesCount = 0; // Initialize a counter for total uses

    parsed.forEach((row) => {
      const sessionId = (
        row["Session ID (Optional)"] || row["Session ID (Optional) "]
      )?.trim();
      if (sessionId) {
        totalUsesCount++; // Increment the total uses counter for each row with a Session ID
      }

      const game = (row["Game (Optional)"] || row["Game (Optional) "])?.trim();

      const tagsStr =
        row["Tags (Optional, comma-separated)"] ||
        row[" Tags (Optional, comma-separated) "];
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
    });

    const trendingTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag, count]) => ({ name: tag, count }));

    const trendingGames = Object.entries(gameCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([game, count]) => ({ name: game, count }));

    console.log("Trending Tags:", trendingTags);
    console.log("Trending Games:", trendingGames);
    console.log("Total Uses (counting all submissions):", totalUsesCount);

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
    ); // Use totalUsesCount

    console.log("Successfully updated community data.");
  } catch (err) {
    console.error("Error processing sheet:", err);
    process.exit(1);
  }
}

processSheet();
