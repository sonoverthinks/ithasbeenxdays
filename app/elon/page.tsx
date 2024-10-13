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
    <div className="flex flex-col rounded-lg border border-gray-200">
      <div className="flex flex-col">
        {/* <p className="text-2xl p-4 font-semibold text-darkGray border-b border-gray-200 py-4">
          since Elon Twitted About
        </p> */}
        {topics.map((topic) => (
          <div
            className="hover:bg-extraExtraLightGray duration-75 ease-in-out border-b border-gray-200 py-4"
            key={topic.id}
          >
            <Link className="" href={`/elon/${topic.name}`}>
              <p className="text-blue text-xl px-4">{topic.name}</p>
            </Link>
            <p className="text-2xl px-4">
              {calculateTimeSince(topic.tweets[0].createdAt)}
            </p>
            <p className="px-4 text-base">{topic.tweets[0].content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
