import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useGetMember } from "../api/use-get-member";
import { Button } from "@/components/ui/button";
import ErrorFallback from "@/components/error-fallback";
import { MailIcon, XIcon } from "lucide-react";
import Loader from "@/components/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface ProfileProps {
  memberId: Id<"members">;
  onClose: () => void;
}

const Profile = ({ memberId, onClose }: ProfileProps) => {
  const { data: member, isLoading: loadingMember } = useGetMember({
    id: memberId,
  });

  if (loadingMember)
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
  );
};

export default Profile;
