import UserButton from "@/features/auth/components/user-button";
import { Bell, Home, MessagesSquare, MoreHorizontal } from "lucide-react";
import SidebarButton from "./sidebar-button";
import WorkspaceSwitcher from "./workspace-switcher";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-[#481349] w-[70px] h-full flex flex-col gap-y-4 items-center pt-[9px] pb-[4px]">
      <WorkspaceSwitcher />
      <SidebarButton
        icon={Home}
        label="Home"
        isActive={pathname.includes("/workspace")}
      />
      <SidebarButton
        icon={MessagesSquare}
        label="DMs"
        href="/learn"
        isActive={pathname.includes("/learn")}
      />
      <SidebarButton icon={Bell} label="Activity" />
      <SidebarButton icon={MoreHorizontal} label="More" />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};

export default Sidebar;
