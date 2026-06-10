import { TwitterApi } from "twitter-api-v2";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const CONSUMER_KEY = process.env.X_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.X_CONSUMER_SECRET;
const ACCESS_TOKEN = process.env.X_ACCESS_TOKEN;
const ACCESS_SECRET = process.env.X_ACCESS_SECRET;

if (!CONSUMER_KEY || !CONSUMER_SECRET || !ACCESS_TOKEN || !ACCESS_SECRET) {
  console.error("Missing X API credentials in environment variables");
  process.exit(1);
}

const client = new TwitterApi({
  appKey: CONSUMER_KEY,
  appSecret: CONSUMER_SECRET,
  accessToken: ACCESS_TOKEN,
  accessSecret: ACCESS_SECRET,
});

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

async function main() {
  const tweets = parseTweets();

  if (tweets.length === 0) {
    console.error("No tweets found in tweets.md");
    process.exit(1);
  }

  const nextIndex = getNextIndex(tweets);
  const text = tweets[nextIndex];

  console.log(`Posting tweet ${nextIndex + 1}/${tweets.length}: ${text.slice(0, 60)}...`);

  try {
    const response = await client.v2.tweet(text);
    console.log(`Posted! Tweet ID: ${response.data.id}`);
  } catch (err) {
    console.error("Failed to post tweet:", err.message);
    process.exit(1);
  }
}

main();
