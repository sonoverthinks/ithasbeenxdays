import { prisma } from "@/lib/prisma";
import { cleanParam } from "@/utils/string-helpers";
import { calculateTimeSince } from "@/utils/time-helpers";

type PageProps = {
  params: {
    topic: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const topic = await prisma.topic.findUnique({
    where: {
      name: cleanParam(params.topic),
    },
    select: {
      id: true,
      name: true,
      tweets: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
  console.log("🚀 ~ Page ~ topic:", topic);
  return (
    <div>
      <p>{topic?.name}</p>
      {topic?.tweets.map((tweet) => {
        return (
          <div key={tweet.id}>
            <p>{tweet.content}</p>
            <p>{calculateTimeSince(tweet.createdAt)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
