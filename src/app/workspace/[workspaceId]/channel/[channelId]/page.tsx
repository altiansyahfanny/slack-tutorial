"use client";

import ErrorFallback from "@/components/error-fallback";
import Loader from "@/components/loader";
import { useGetChannel } from "@/features/channel/api/use-get-channel";
import { useChannelId } from "@/hooks/use-channel-id";
import React from "react";
import Header from "./components/header";
import ChatInput from "./components/chat-input";

const ChannelIdPage = () => {
  const channelId = useChannelId();

  const { data: channel, isLoading: channelLoading } = useGetChannel({
    id: channelId,
  });

  if (channelLoading) return <Loader />;

  if (!channel) return <ErrorFallback message="Channel not found" />;

  return (
    <div className="flex flex-col h-full justify-between">
      <Header title={channel.name} />
      <ChatInput plaeceholder={`Message # ${channel.name}`} />
    </div>
  );
};

export default ChannelIdPage;
