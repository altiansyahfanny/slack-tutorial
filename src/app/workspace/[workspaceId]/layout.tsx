"use client";

import React, { Suspense } from "react";

import Toolbar from "./_components/toolbar";
import Sidebar from "./_components/sidebar";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import WorkspaceSidebar from "./_components/workspace-sidebar";
import { usePanel } from "@/hooks/use-panel";
import { LoaderIcon } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import Thread from "@/features/message/components/thread";
import Profile from "@/features/member/components/profile";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(
  () => import("./_components/workspace-sidebar"),
  {
    suspense: true,
  }
);

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  const { onClose, parentMessageId, profileMemberId } = usePanel();

  const showPanel = !!parentMessageId || !!profileMemberId;

  return (
    <div className="h-full ">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup
          direction="horizontal"
          autoSave="ca-workspace-layout"
        >
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-[#5E2C5F]"
          >
            <Suspense fallback={<div>Loading component...</div>}>
              <DynamicComponent />
            </Suspense>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20} defaultSize={60}>
            <div className="bg-slate-50x flex-1 h-full w-full">{children}</div>
          </ResizablePanel>
          {showPanel && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={20} defaultSize={80}>
                {parentMessageId ? (
                  <Thread
                    messageId={parentMessageId as Id<"messages">}
                    onClose={onClose}
                  />
                ) : profileMemberId ? (
                  <Profile
                    memberId={profileMemberId as Id<"members">}
                    onClose={onClose}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
                  </div>
                )}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkspaceIdLayout;
