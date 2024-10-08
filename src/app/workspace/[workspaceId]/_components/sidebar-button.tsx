import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { IconType } from "react-icons/lib";

interface SidebarButtonProps {
  icon: LucideIcon | IconType;
  label: string;
  href?: string;
  isActive?: boolean;
}

const SidebarButton = ({
  icon: Icon,
  label,
  isActive,
  href = "/",
}: SidebarButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(href);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-y-0.5 cursor-pointer group">
      <Button
        variant={"tranparent"}
        className={cn(
          "size-9 p-2 group-hover:bg-accent/20",
          isActive && "bg-accent/20"
        )}
        onClick={onClick}
      >
        <Icon
          className={cn(
            "size-5 text-white/60 group-hover:scale-110 group-hover:text-accent transition-all",
            isActive && "text-white"
          )}
        />
      </Button>
      <span
        className={cn(
          "text-xs text-white/60 group-hover:text-accent",
          isActive && "text-white"
        )}
      >
        {label}
      </span>
    </div>
  );
};

export default SidebarButton;
