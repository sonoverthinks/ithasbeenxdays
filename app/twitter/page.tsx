import { Tweet } from "@/types/twitter";
import { fetchTwitterTimeline } from "@/lib/fetch-timeline";
// import { removeUrls } from "@/utils/string-helpers";

const Page = async () => {
  const timeline: Tweet[] = await fetchTwitterTimeline();
  //   const filteredTimeline = timeline.filter((tweet) => {
  //     return !tweet.retweeted;
  //   });
  console.log("🚀 ~ Page ~ timeline:", timeline);

  return (
    <ul>
      {timeline.map((tweet) => {
        if (tweet.retweeted_tweet) {
          return <li key={tweet.tweet_id}>{tweet.retweeted_tweet.text}</li>;
        }
        // if (tweet.quoted) {
        //   return <li key={tweet.tweet_id}>{tweet.quoted.text}</li>;
        // }
        return <li key={tweet.tweet_id}>{tweet.text}</li>;
      })}
    </ul>
  );
};

export default Page;
