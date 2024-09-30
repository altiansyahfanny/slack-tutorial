import React, { useRef } from "react";

import dynamic from "next/dynamic";
import Quill from "quill";
const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface ChatInputProps {
  plaeceholder: string;
}

const ChatInput = ({ plaeceholder }: ChatInputProps) => {
  const editorRef = useRef<Quill | null>(null);
  return (
    <div className="px-5 w-full">
      <Editor
        variant="create"
        placeholder={plaeceholder}
        onSubmit={() => {}}
        disabled={false}
        innerRef={editorRef}
      />
    </div>
  );
};

export default ChatInput;
