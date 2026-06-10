import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const API_KEY = process.env.TYPEFULLY_API_KEY;
const SOCIAL_SET_ID = process.env.TYPEFULLY_SOCIAL_SET_ID;

if (!API_KEY) {
  console.error("Missing TYPEFULLY_API_KEY environment variable");
  process.exit(1);
}

if (!SOCIAL_SET_ID) {
  console.error("Missing TYPEFULLY_SOCIAL_SET_ID environment variable");
  process.exit(1);
}

const TWEETS_FILE = join(__dirname, "tweets.md");
const STATE_FILE = join(__dirname, ".tweet-state.json");

function parseTweets() {
  const content = readFileSync(TWEETS_FILE, "utf-8");
  const tweets = [];
  let current = null;

  for (const line of content.split("\n")) {
    const match = line.match(/^## (\d+)\. /);
    if (match) {
      if (current) tweets.push(current);
      current = { index: parseInt(match[1]), text: "" };
    } else if (current) {
      current.text += line + "\n";
    }
  }
  if (current) tweets.push(current);

  return tweets.map((t) => t.text.trim()).filter(Boolean);
}

function getNextIndex(tweets) {
  const state = existsSync(STATE_FILE)
    ? JSON.parse(readFileSync(STATE_FILE, "utf-8"))
    : { index: 0 };

  const next = state.index;
  state.index = (state.index + 1) % tweets.length;
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));

  return next;
}

async function postToTypefully(text) {
  const body = {
    platforms: {
      x: {
        enabled: true,
        posts: [{ text }],
        settings: {},
      },
    },
    draft_title: `Auto post ${new Date().toISOString().slice(0, 10)}`,
    publish_at: "next-free-slot",
    share: false,
  };

  const response = await fetch(
    `https://api.typefully.com/v2/social-sets/${SOCIAL_SET_ID}/drafts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Typefully API error (${response.status}): ${err}`);
  }

  return response.json();
}

async function main() {
  const tweets = parseTweets();

  if (tweets.length === 0) {
    console.error("No tweets found in tweets.md");
    process.exit(1);
  }

  const nextIndex = getNextIndex(tweets);
  const text = tweets[nextIndex];

  console.log(`Scheduling tweet ${nextIndex + 1}/${tweets.length}: ${text.slice(0, 60)}...`);

  try {
    const result = await postToTypefully(text);
    console.log(`Scheduled! Draft ID: ${result.id}`);
    console.log(`Status: ${result.status}`);
    console.log(`Scheduled for: ${result.scheduled_date || "next-free-slot"}`);
  } catch (err) {
    console.error("Failed to schedule tweet:", err.message);
    process.exit(1);
  }
}

main();
