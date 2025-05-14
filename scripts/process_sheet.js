const Papa = require("papaparse");
const fs = require("node:fs/promises");

async function processSheet() {
  const sheetId = process.env.GOOGLE_SHEET_ID; // Use the sheet ID from the environment variable
  const csvUrl = `https://docs.google.com/spreadsheets/${sheetId}/gviz/tq?tqx=out:csv&gid=303206144`;

  try {
    const response = await fetch(csvUrl);
    if (!response.ok) {
      console.error(
        `Failed to fetch CSV: ${response.status} ${response.statusText}`
      );
      // Include the URL in the error message for easier debugging
      console.error(`CSV URL: ${csvUrl}`);
      throw new Error(
        `Failed to fetch CSV. Status: ${response.status}, Text: ${response.statusText}, URL: ${csvUrl}`
      );
    }

    const csvText = await response.text();
    // console.log("Fetched CSV Data:", csvText); // Remove this line to reduce verbosity

    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => {
        const trimmedHeader = header.trim();
        // Standardize header names and handle potential timestamp issue
        if (trimmedHeader.startsWith("Timestamp")) {
          return null; // Ignore the timestamp column
        }
        if (
          trimmedHeader === "Game (Optional)" ||
          trimmedHeader === "Game (Optional) "
        ) {
          return "Game (Optional)";
        }
        if (
          trimmedHeader === "Tags (Optional, comma-separated)" ||
          trimmedHeader === "Tags (Optional, comma-separated) "
        ) {
          return "Tags (Optional, comma-separated)";
        }
        if (
          trimmedHeader === "Session ID (Optional)" ||
          trimmedHeader === "Session ID (Optional) "
        ) {
          return "Session ID (Optional)";
        }
        return trimmedHeader; // Return the trimmed header
      },
    }).data;

    const tagCounts = {};
    const gameCounts = {};
    let totalUsesCount = 0;

    parsed.forEach((row) => {
      const sessionId = row["Session ID (Optional)"]; // Access directly
      if (sessionId) {
        totalUsesCount++;
      }

      const game = row["Game (Optional)"]; // Access directly
      const tagsStr = row["Tags (Optional, comma-separated)"]; // Access directly
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
      .sort(([, countA], [, countB]) => countB - countA) // Destructure for clarity
      .slice(0, 10)
      .map(([tag, count]) => ({ name: tag, count }));

    const trendingGames = Object.entries(gameCounts)
      .sort(([, countA], [, countB]) => countB - countA) // Destructure for clarity
      .slice(0, 5)
      .map(([game, count]) => ({ name: game, count }));

    console.log("Trending Tags:", trendingTags);
    console.log("Trending Games:", trendingGames);
    console.log("Total Uses (counting all submissions):", totalUsesCount);

    // Ensure the 'docs' directory exists before writing files.
    try {
      await fs.mkdir("docs", { recursive: true }); // Create directory if it doesn't exist
    } catch (mkdirErr) {
      console.error("Error creating 'docs' directory:", mkdirErr);
      throw mkdirErr; // Re-throw to stop processing if directory creation fails
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
    process.exit(1); // Explicitly exit on error
  }
}

processSheet();
