import { TriangleAlert } from "lucide-react";
import React from "react";

const ErrorFallback = ({ message }: { message: string }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-2">
      <TriangleAlert className="size-6 text-muted-foreground" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorFallback;
