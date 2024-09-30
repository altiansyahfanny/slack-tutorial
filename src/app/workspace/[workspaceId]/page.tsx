"use client";

import ErrorFallback from "@/components/error-fallback";
import Loader from "@/components/loader";
import { useGetChannels } from "@/features/channel/api/use-get-channels";
import { useCreateChannelModal } from "@/features/channel/store/use-create-channel-modal";
import { useCurrentMember } from "@/features/member/api/use-current-member";
import { useGetWorkspace } from "@/features/workspace/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const WorkspaceIdPage = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateChannelModal();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });

  const channelId = useMemo(() => channels?.[0]?._id, [channels]);
  const isAdmin = useMemo(() => member?.role === "admin", [member]);

  useEffect(() => {
    if (
      workspaceLoading ||
      channelsLoading ||
      !workspace ||
      memberLoading ||
      !member
    )
      return;

    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!open && isAdmin) {
      setOpen(true);
    }
  }, [
    channelId,
    channelsLoading,
    workspace,
    workspaceLoading,
    open,
    setOpen,
    router,
    workspaceId,
    isAdmin,
    member,
    memberLoading,
  ]);

  if (workspaceLoading || channelsLoading || memberLoading) {
    return <Loader />;
  }

  if (!workspace || !member) {
    return <ErrorFallback message="Workspace not found." />;
  }

  return <ErrorFallback message="No channel found." />;
};

export default WorkspaceIdPage;
