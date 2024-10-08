"use client";

import CreateChannelModal from "@/features/channel/components/create-channel-modal";
import { CreateWorkspaceModal } from "@/features/workspace/components/create-workspace-modal";
import React, { useEffect, useState } from "react";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  });

  if (!mounted) return null;

  return (
    <>
      <CreateWorkspaceModal />
      <CreateChannelModal />
    </>
  );
};
