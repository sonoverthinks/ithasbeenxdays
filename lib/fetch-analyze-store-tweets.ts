import { Tweet } from "@/types/twitter";
import { prisma } from "./prisma";
import { analyzeTweets } from "./analyze-tweets";
// import { fetchTwitterTimeline } from "./fetch-timeline";

async function fetchTwitterTimeline<T>(screenname = "elonmusk"): Promise<T> {
  const apiKey = process.env.X_RAPID_API_KEY as string;
  const url = `https://twitter-api45.p.rapidapi.com/timeline.php?screenname=${screenname}`;

  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "twitter-api45.p.rapidapi.com",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data.timeline);
  return data.timeline;
}

export const fetchAnalyzeAndStoreTweets = async () => {
  try {
    console.log("Start fetching timeline and analysis...");
    const timeline: Tweet[] = await fetchTwitterTimeline();
    console.log(`Fetched ${timeline.length} tweets`);

    for (const tweet of timeline) {
      const existingTweet = await prisma.tweet.findUnique({
        where: { tweetId: tweet.tweet_id },
      });
      if (!existingTweet) {
        const topics = await analyzeTweets(tweet.text);
        console.log(
          `Analyzed tweet ${tweet.tweet_id}. Topics: ${topics.join(", ")}`
        );
        await prisma.tweet.create({
          data: {
            tweetId: tweet.tweet_id,
            content: tweet.text,
            createdAt: new Date(tweet.created_at),
            topics: {
              connectOrCreate: topics.map((topic) => ({
                where: { name: topic },
                create: { name: topic },
              })),
            },
            user: {
              connectOrCreate: {
                where: {
                  rest_id: "44196397",
                  screen_name: "elonmusk",
                },
                create: {
                  rest_id: "44196397",
                  screen_name: "elonmusk",
                },
              },
            },
          },
        });
      } else {
        console.log(
          `Tweet ${tweet.tweet_id} already exists in database, skipping`
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
  console.log("FINISHED FETCH AND ANALYZING");
};
