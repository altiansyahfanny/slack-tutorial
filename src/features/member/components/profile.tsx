import ErrorFallback from "@/components/error-fallback";
import Loader from "@/components/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useConfirm from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { ChevronDownIcon, MailIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";
import { useCurrentMember } from "../api/use-current-member";
import { useGetMember } from "../api/use-get-member";
import { useRemoveMember } from "../api/use-remove-member";
import { useUpdateMember } from "../api/use-update-member";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuRadioGroup } from "@radix-ui/react-dropdown-menu";

interface ProfileProps {
  memberId: Id<"members">;
  onClose: () => void;
}

const Profile = ({ memberId, onClose }: ProfileProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const [UpdateDialog, confimUpdate] = useConfirm(
    "Change role",
    "Are you sure to change this member's role?"
  );
  const [LeaveDialog, confimLeave] = useConfirm(
    "Leave workspace",
    "Are you sure you want to leave the workspace?"
  );
  const [RemoveDialog, confimRemove] = useConfirm(
    "Remove member",
    "Are you sure to remove this member?"
  );

  const { data: currentMember, isLoading: isLoadingCurrentMember } =
    useCurrentMember({ workspaceId });

  const { mutate: updateMember, isPending: isUpdatingMember } =
    useUpdateMember();

  const { mutate: removeMember, isPending: isRemovingMember } =
    useRemoveMember();

  const { data: member, isLoading: loadingMember } = useGetMember({
    id: memberId,
  });

  const onRemove = async () => {
    const confirmed = await confimRemove();
    if (!confirmed) return;
    removeMember(
      { id: memberId },
      {
        onSuccess: () => {
          toast.success("Member removed successfully");
          onClose();
        },
        onError: () => {
          toast.error("Failed to remove member");
        },
      }
    );
  };

  const onLeave = async () => {
    const confirmed = await confimLeave();
    if (!confirmed) return;
    removeMember(
      { id: memberId },
      {
        onSuccess: () => {
          router.replace(`/`);
          toast.success("You left the workspace");
          onClose();
        },
        onError: () => {
          toast.error("Failed to leave the workspace");
        },
      }
    );
  };

  const onUpdate = async (role: "admin" | "member") => {
    const confirmed = await confimUpdate();
    if (!confirmed) return;

    updateMember(
      { id: memberId, role },
      {
        onSuccess: () => {
          toast.success("You left the workspace");
          onClose();
        },
        onError: () => {
          toast.error("Failed to leave the workspace");
        },
      }
    );
  };

  if (loadingMember || isLoadingCurrentMember)
    return (
      <div className="h-full flex flex-col">
        <div className="h-[49px] flex justify-between items-center px-4 border-b">
          <p className="text-lg font-bold">Member</p>
          <Button variant={"ghost"} size={"iconSm"} onClick={onClose}>
            <XIcon className="size-5 stroke-[1.5px]" />
          </Button>
        </div>
        <div className="flex-1">
          <Loader />
        </div>
      </div>
    );

  if (!member) {
    return (
      <div className="h-full flex flex-col">
        <div className="h-[49px] flex justify-between items-center px-4 border-b">
          <p className="text-lg font-bold">Thread</p>
          <Button variant={"ghost"} size={"iconSm"} onClick={onClose}>
            <XIcon className="size-5 stroke-[1.5px]" />
          </Button>
        </div>
        <div className="flex-1">
          <ErrorFallback message="Profile not found" />
        </div>
      </div>
    );
  }

  const avatarFallback = member.user.name?.charAt(0).toUpperCase() ?? "M";
  return (
    <>
      <RemoveDialog />
      <LeaveDialog />
      <UpdateDialog />

      <div className="h-full flex flex-col">
        <div className="h-[49px] flex justify-between items-center px-4 border-b">
          <p className="text-lg font-bold">Profile</p>
          <Button variant={"ghost"} size={"iconSm"} onClick={onClose}>
            <XIcon className="size-5 stroke-[1.5px]" />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <Avatar className="max-w-[256px] max-h-[256px] size-full">
            <AvatarImage src={member.user.image} />
            <AvatarFallback className="text-6xl aspect-square">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col p-4 ">
          <p className="font-bold text-xl">{member.user.name}</p>
          {currentMember?.role === "admin" &&
          currentMember?._id !== memberId ? (
            <div className="mt-4 flex items-center gap-2 ">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"outline"} className="w-full capitalize">
                    {member.role} <ChevronDownIcon className="size-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuRadioGroup
                    value={member.role}
                    onValueChange={(role) =>
                      onUpdate(role as "admin" | "member")
                    }
                  >
                    <DropdownMenuRadioItem value="admin">
                      Admin
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="member">
                      Member
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant={"outline"}
                className="w-full capitalize"
                onClick={onRemove}
              >
                Remove
              </Button>
            </div>
          ) : currentMember?._id === memberId &&
            currentMember.role !== "admin" ? (
            <div className="mt-4">
              <Button
                variant={"outline"}
                className="w-full capitalize"
                onClick={onLeave}
              >
                Leave
              </Button>
            </div>
          ) : null}
        </div>
        <Separator />
        <div className="flex flex-col p-4 ">
          <p className="font-bold text-sm mb-4">Contact Information</p>
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-md bg-muted flex items-center justify-center">
              <MailIcon className="size-4" />
            </div>
            <div className="flex flex-col">
              <p className=" text-[13px] font-semibold text-muted-foreground">
                Email address
              </p>
              <Link
                href={`mailto:${member.user.email}`}
                className="text-sm hover:underline text-[#1264a3]"
              >
                {member.user.email}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
