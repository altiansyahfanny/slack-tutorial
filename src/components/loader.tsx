import { LoaderIcon } from "lucide-react";

const Loader = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-2">
      <LoaderIcon className="size-5 text-muted-foreground animate-spin" />
    </div>
  );
};

export default Loader;
