import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons/lib";

const sidebarItemVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-[18px]m px-3.5 text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#F9EDFFCC]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface SidebarItemProps {
  label: string;
  id: string;
  icon: LucideIcon | IconType;
  variant?: VariantProps<typeof sidebarItemVariants>["variant"];
}

const SidebarItem = ({ icon: Icon, id, label, variant }: SidebarItemProps) => {
  const workspaceId = useWorkspaceId();
  return (
    <Button
      asChild
      variant={"tranparent"}
      size={"sm"}
      className={cn(sidebarItemVariants({ variant }))}
    >
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <div className="rounded-md p-0.5 size-6 grid place-content-center">
          <Icon className="size-4 shrink-0" />
        </div>
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};

export default SidebarItem;
