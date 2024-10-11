import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { calculateTimeSince } from "@/utils/time-helpers";

/* 
add tweet_id to tweet schema

*/
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
  // console.log("🚀 ~ Page ~ topics:", topics);

  return (
    <div className="flex flex-col gap-y-4 p-4 rounded-lg border border-gray-200">
      <div className="flex flex-col gap-y-2">
        {topics.map((topic) => (
          <div key={topic.id}>
            <p>
              {calculateTimeSince(topic.tweets[0].createdAt)} since Elon twitted
              about{" "}
              <span className="">
                <Link href={`/elon/${topic.name}`}>{topic.name}</Link>
              </span>
            </p>

            <p>{topic.tweets[0].content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
