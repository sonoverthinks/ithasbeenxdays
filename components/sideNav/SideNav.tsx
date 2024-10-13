import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ShowMore from "./ShowMore";

const SideNav = async () => {
  const fetchTopics = async (
    minCount = 15
  ): Promise<Array<{ id: string; name: string; tweetCount: number }>> => {
    let topTopics = await prisma.topic.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { tweets: true },
        },
      },
      orderBy: {
        tweets: {
          _count: "desc",
        },
      },
      take: minCount,
    });

    // If we don't have enough topics, fetch all available topics
    if (topTopics.length < minCount) {
      topTopics = await prisma.topic.findMany({
        select: {
          id: true,
          name: true,
          _count: {
            select: { tweets: true },
          },
        },
        orderBy: {
          tweets: {
            _count: "desc",
          },
        },
      });
    }

    return topTopics.map((topic) => ({
      id: topic.id,
      name: topic.name,
      tweetCount: topic._count.tweets,
    }));
  };

  const topics = await fetchTopics();
  return (
    <div className="rounded-lg w-full max-w-sm border border-gray-200">
      <p className="text-2xl p-4 font-semibold">Elon Favorites</p>
      {topics.map((topic) => {
        return (
          <TopicCard
            key={topic.id}
            topic={topic.name}
            tweetCount={topic.tweetCount}
          />
        );
      })}
      <ShowMore />
    </div>
  );
};

const TopicCard = ({
  topic,
  tweetCount,
}: {
  topic: string;
  tweetCount: number;
}) => {
  return (
    <Link href={`/elon/${topic}`}>
      <div className="p-4 py-3 hover:cursor-pointer hover:bg-slate-100 duration-75 ease-in-out">
        <p className="text-base font-semibold text-black">{topic}</p>
        <p className="text-sm text-darkGray">{`${tweetCount} times`}</p>
      </div>
    </Link>
  );
};

export default SideNav;
