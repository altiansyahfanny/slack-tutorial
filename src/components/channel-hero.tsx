import { format } from "date-fns";
import React from "react";

interface ChannelHeroProps {
  name: string;
  creationTime: number;
}

const ChannelHero = ({ creationTime, name }: ChannelHeroProps) => {
  return (
    <div className="mt-[88px] mx-5 mb-4">
      <p className="text-2xl font-bold flex items-center mb-2 text-slate-800">
        👋 Welcome to the # {name} channel
      </p>
      <p className="font-normal text-sm text-slate-600 mb-4">
        This channel was created on{format(creationTime, " MMMM do, yyyy")}.
        This is the very beginning of the <strong>{name}</strong> channel.
      </p>
    </div>
  );
};

export default ChannelHero;
