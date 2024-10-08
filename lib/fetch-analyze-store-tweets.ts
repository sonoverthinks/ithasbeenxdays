import { Tweet } from "@/types/twitter";
import { prisma } from "./prisma";
import { analyzeTweets } from "./analyze-tweets";
import { fetchTwitterTimeline } from "./fetch-timeline";

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
                  rest_id: tweet.author.rest_id,
                  screen_name: tweet.author.screen_name,
                },
                create: {
                  rest_id: tweet.author.rest_id,
                  screen_name: tweet.author.screen_name,
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
      console.log("FINISHED FETCH AND ANALYZING");
    }
  } catch (error) {
    console.error(error);
  }
};
