import React from "react";

const SideNav = () => {
  return (
    <div className="rounded-lg w-full max-w-sm border border-gray-200">
      <p className="text-2xl p-4 font-semibold">Elon Favorites</p>
      <TopicCard topic="Tesla" mentions="5" />
      <TopicCard topic="politics" mentions="15" />
      <TopicCard topic="memes" mentions="5" />
    </div>
  );
};

const TopicCard = ({
  topic,
  mentions,
}: {
  topic: string;
  mentions: string;
}) => {
  return (
    <div className="p-4 py-3 hover:cursor-pointer hover:bg-slate-100 duration-75 ease-in-out">
      <p className="text-base font-semibold text-bunker">{topic}</p>
      <p className="text-sm text-blackCoral">{`${mentions} times`}</p>
    </div>
  );
};

export default SideNav;
