"use client";

import ErrorFallback from "@/components/error-fallback";
import Loader from "@/components/loader";
import { useGetChannel } from "@/features/channel/api/use-get-channel";
import { useGetMessages } from "@/features/message/api/use-get-mesagges";
import { useChannelId } from "@/hooks/use-channel-id";
import ChatInput from "./components/chat-input";
import Header from "./components/header";
import MessageList from "@/components/message-list";

const ChannelIdPage = () => {
  const channelId = useChannelId();

  const { results, status, loadMore } = useGetMessages({ channelId });
  const { data: channel, isLoading: channelLoading } = useGetChannel({
    id: channelId,
  });

  if (channelLoading || status === "LoadingFirstPage") {
    return <Loader />;
  }

  if (!channel) return <ErrorFallback message="Channel not found" />;

  return (
    <div className="flex flex-col h-full justify-between">
      <Header title={channel.name} />
      <MessageList
        channelName={channel.name}
        channelCreationTime={channel._creationTime}
        data={results}
        loadMore={loadMore}
        isLoadingMore={status === "LoadingMore"}
        canLoadMore={status === "CanLoadMore"}
      />
      <ChatInput plaeceholder={`Message # ${channel.name}`} />
    </div>
  );
};

export default ChannelIdPage;
