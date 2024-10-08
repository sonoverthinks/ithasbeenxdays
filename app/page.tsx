import { prisma } from "@/lib/prisma";
import { calculateTimeSince } from "@/utils/time-helpers";

const Page = async () => {
  const topics = await prisma.topic.findMany({
    select: {
      id: true,
      name: true,
      tweets: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: {
          content: true,
          createdAt: true,
        },
      },
    },
  });
  console.log("🚀 ~ Page ~ topics:", topics);

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        {topics.map((topic) => (
          <div key={topic.id}>
            <p>{topic.name}</p>
            <p>{topic.tweets[0].content}</p>
            <p>{calculateTimeSince(topic.tweets[0].createdAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
