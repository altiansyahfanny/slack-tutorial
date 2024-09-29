import React from "react";

interface WorkspaceIdPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdPage: React.FC<WorkspaceIdPageProps> = ({ params }) => {
  return <div>Workspace id page</div>;
};

export default WorkspaceIdPage;
