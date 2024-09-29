"use client";

import UserButton from "@/features/auth/components/user-button";
import { useGetWorkspaces } from "@/features/workspace/api/use-get-workspaces";
import { useCreaateWorkspaceModal } from "@/features/workspace/store/use-create-workspace-modal";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const Home = () => {
  const router = useRouter();

  const [open, setOpen] = useCreaateWorkspaceModal();

  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      console.log("Open creation modal");
      setOpen(true);
    }
  }, [workspaceId, isLoading, open, setOpen]);

  return <UserButton />;
};

export default Home;
