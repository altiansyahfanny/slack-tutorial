"use client";

import ErrorFallback from "@/components/error-fallback";
import Loader from "@/components/loader";
import { useCreateOrGetConversation } from "@/features/conversation/api/use-create-or-get-conversation";
import { useMemberId } from "@/hooks/use-member-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import React, { useEffect, useState } from "react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import { useDebugConversation } from "@/features/conversation/api/use-debug-conversation";
import Conversation from "./_components/conversation";

const MemberIdPage = () => {
  const workspaceId = useWorkspaceId();
  const memberId = useMemberId();

  const [conversationId, setConversationId] =
    useState<Id<"conversations"> | null>(null);

  const { mutate, isPending } = useCreateOrGetConversation();

  useEffect(() => {
    mutate(
      {
        workspaceId,
        memberId,
      },
      {
        onSuccess: (data) => {
          console.log("onSuccess : ", data);
          setConversationId(data);
        },
        onError: (error) => {
          toast.error("Failed to create or get conversation");
        },
      }
    );
  }, [memberId, workspaceId, mutate]);

  if (isPending) {
    return <Loader />;
  }

  if (!conversationId) {
    return <ErrorFallback message="Converstion not found" />;
  }

  return <Conversation id={conversationId} />;
};

export default MemberIdPage;
