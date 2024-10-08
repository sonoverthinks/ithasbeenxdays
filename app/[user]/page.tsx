import { analyzeTweets } from "@/lib/analyze-tweets";

type PageProps = {
  params: {
    user: string;
  };
};

const Page = async ({ params: { user } }: PageProps) => {
  console.log(user);
  const tweet = "https://t.co/lyXp5GeVHO";
  const topics = await analyzeTweets(tweet);
  return (
    <div>
      {topics.map((topic, index) => {
        return <p key={index}>{topic}</p>;
      })}
    </div>
  );
};

export default Page;
