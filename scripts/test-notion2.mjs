import { config } from "dotenv";
import { Client } from "@notionhq/client";

config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const PROJECTS_DATA_SOURCE_ID = "27b197ab-f07b-80cf-8d0e-000b8507cb8f";

try {
  // Fetch all pages to find ones with Activity relations
  let cursor;
  let found = null;
  let activityIds = new Set();

  do {
    const query = { data_source_id: PROJECTS_DATA_SOURCE_ID };
    if (cursor) query.start_cursor = cursor;
    const response = await notion.dataSources.query(query);

    for (const page of response.results) {
      const activity = page.properties.Activity;
      if (activity?.relation?.length > 0) {
        if (!found) {
          found = page;
          console.log("=== First project with Activity ===");
          console.log("Name:", page.properties.Name.title[0]?.plain_text);
          console.log("Activity relation:", JSON.stringify(activity, null, 2));
        }
        for (const rel of activity.relation) {
          activityIds.add(rel.id);
        }
      }
    }

    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);

  console.log("\n=== All unique Activity IDs ===");
  console.log([...activityIds]);

  // Fetch the first few activity pages to see their structure
  console.log("\n=== Fetching Activity pages ===");
  const ids = [...activityIds].slice(0, 5);
  for (const id of ids) {
    try {
      const page = await notion.pages.retrieve({ page_id: id });
      console.log("\nActivity page:", id);
      console.log("Properties:", JSON.stringify(page.properties, null, 2));
    } catch (err) {
      console.log("Could not fetch page", id, ":", err.message);
    }
  }
} catch (error) {
  console.error("Error:", error);
}
