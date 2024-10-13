import { Tweet } from "@/types/twitter";
import { prisma } from "./prisma";
import { analyzeTweets } from "./analyze-tweets";
import { fetchTwitterTimeline } from "./fetch-timeline";

export const fetchAnalyzeAndStoreTweets = async () => {
  try {
    console.log("Start fetching timeline and analysis...");
    const timeline: Tweet[] = await fetchTwitterTimeline();
    console.log(`Fetched ${timeline.length} tweets`);

    // Fetch existing tweets in a single query
    const existingTweets = await prisma.tweet.findMany({
      where: {
        tweetId: {
          in: timeline.map((tweet) => tweet.tweet_id),
        },
      },
      select: { tweetId: true },
    });

    const existingTweetIds = new Set(existingTweets.map((t) => t.tweetId));

    // Filter out existing tweets
    const newTweets = timeline.filter(
      (tweet) => !existingTweetIds.has(tweet.tweet_id)
    );

    // The prisma.tweet.createMany() method doesn't support nested writes (i.e., the topics.connectOrCreate relation won't work).
    // Process and create new tweets one by one
    for (const tweet of newTweets) {
      let topics;
      if (tweet.retweeted_tweet) {
        topics = await analyzeTweets(tweet.retweeted_tweet.text);
      } else if (tweet.quoted) {
        topics = await analyzeTweets(tweet.quoted.text);
      } else {
        topics = await analyzeTweets(tweet.text);
      }
      console.log(
        `Analyzed tweet ${tweet.tweet_id}. Topics: ${topics.join(", ")}`
      );

      // Create tweet with associated topics
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
        },
      });
    }

    console.log("Finished fetching and analyzing tweets.");
  } catch (error) {
    console.error(error);
  }
};

// for (const tweet of timeline) {
//   const existingTweet = await prisma.tweet.findUnique({
//     where: { tweetId: tweet.tweet_id },
//   });
//   if (!existingTweet) {
//     const topics = await analyzeTweets(tweet.text);
//     console.log(
//       `Analyzed tweet ${tweet.tweet_id}. Topics: ${topics.join(", ")}`
//     );
//     await prisma.tweet.create({
//       data: {
//         tweetId: tweet.tweet_id,
//         content: tweet.text,
//         createdAt: new Date(tweet.created_at),
//         topics: {
//           connectOrCreate: topics.map((topic) => ({
//             where: { name: topic },
//             create: { name: topic },
//           })),
//         },
//       },
//     });
//   } else {
//     console.log(
//       `Tweet ${tweet.tweet_id} already exists in database, skipping`
//     );
//   }
// }
