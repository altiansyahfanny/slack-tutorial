import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { useToggle } from "react-use";

interface WorkspaceSectionProps {
  children: React.ReactNode;
  label: string;
  hint: string;
  onNew?: () => void;
}

const WorkspaceSection = ({
  children,
  hint,
  label,
  onNew,
}: WorkspaceSectionProps) => {
  const [on, toogle] = useToggle(true);

  return (
    <div className="flex flex-col mt-3 px-2 gap-y-1">
      <div className="flex items-center px-3.5 group">
        <Button
          variant={"tranparent"}
          className="p-0.5 text-sm text-[#F9EDFFCC] shrink-0 size-6"
          onClick={toogle}
        >
          <FaCaretDown
            className={cn(
              "size-4 transition-transform -rotate-90",
              on && "rotate-0"
            )}
          />
        </Button>
        {/* <Button
          variant={"tranparent"}
          size={"sm"}
          className="group px-1.5 text-sm text-[#F9EDFFCC] h-[28px] justify-start overflow-hidden items-center bg-green-500/30"
        >
          <span className="truncate">{label}</span>
        </Button> */}

        <div className="ml-1.5">
          <span className="truncate text-sm text-[#F9EDFFCC]">{label}</span>
        </div>
        {onNew && (
          <Hint label={hint} side="top" align="center">
            <Button
              variant={"tranparent"}
              className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm text-[#F9EDFFCC]  shrink-0 size-6"
              onClick={onNew}
              size={"sm"}
            >
              <PlusIcon className="size-5" />
            </Button>
          </Hint>
        )}
      </div>
      {on && children}
    </div>
  );
};

export default WorkspaceSection;
