import {
  MessageSquareTextIcon,
  PencilIcon,
  SmileIcon,
  TrashIcon,
} from "lucide-react";
import EmojiPopover from "./emoji-popover";
import Hint from "./hint";
import { Button } from "./ui/button";

interface ToolbarProps {
  isAuthor: boolean;
  isPending: boolean;
  handleEdit: () => void;
  handleThread: () => void;
  handleDelete: () => void;
  handleReaction: (value: string) => void;
  hideThreadButton?: boolean;
}

const Toolbar = ({
  handleDelete,
  handleEdit,
  handleReaction,
  handleThread,
  hideThreadButton,
  isAuthor,
  isPending,
}: ToolbarProps) => {
  return (
    <div className="absolute right-1 top-1">
      <div className="group-hover:opacity-100 opacity-0 transition-opacity border bg-white rounded-md shadow-sm">
        <EmojiPopover
          hint="Add reaction"
          emojiSelect={(emoji) => handleReaction(emoji.native)}
        >
          <Button variant={"ghost"} size={"iconSm"} disabled={isPending}>
            <SmileIcon className="size-4" />
          </Button>
        </EmojiPopover>
        {!hideThreadButton && (
          <Hint label="Reply in thread">
            <Button
              variant={"ghost"}
              size={"iconSm"}
              disabled={isPending}
              onClick={handleThread}
            >
              <MessageSquareTextIcon className="size-4" />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <>
            <Hint label="Edit message">
              <Button
                variant={"ghost"}
                size={"iconSm"}
                disabled={isPending}
                onClick={handleEdit}
              >
                <PencilIcon className="size-4" />
              </Button>
            </Hint>
            <Hint label="Delete message">
              <Button
                variant={"ghost"}
                size={"iconSm"}
                disabled={isPending}
                onClick={handleDelete}
              >
                <TrashIcon className="size-4" />
              </Button>
            </Hint>
          </>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
