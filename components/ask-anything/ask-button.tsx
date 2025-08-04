import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// NOTE: This is a temporary, hand-crafted version of the Ask Anything button.
// NOTE: 'AI Gradient' -> "bg-gradient-to-r from-purple-400 to-green-200"

// TODO: Replace with a more robust version using base UI components (Button, etc.)

interface AskButtonProps extends React.ComponentProps<typeof Button> {
  className?: string;
}

export function AskButton({ className, ...props }: AskButtonProps) {
  return (
    <Button
      data-default="askButton/compact/default"
      variant="default"
      className={cn("inline-flex h-12 w-[119px] items-center justify-between rounded-[41px] bg-[#1A1A1A] py-2 pr-[0.50px] pl-3 outline outline-[0.50px] outline-offset-[-0.50px] outline-purple-400", className)}
      {...props}
    >
      <div className="flex items-center justify-start gap-1">
        <div className="inline-flex flex-col justify-center gap-1">
          <Image
            src={'/ai-stars.svg'}
            alt="Ask"
            width={14}
            height={14}
            className="size-3.5"
          />
        </div>
        <div className="justify-start font-sans text-base leading-snug font-normal bg-gradient-to-r from-green-200 to-purple-400 bg-clip-text text-transparent">
          Ask
        </div>
      </div>
      <div data-property-1="favIcon" className="size-12 flex items-center justify-center rounded-full bg-black">
        <Image
          src="/nyt-logo-tiny.png"
          alt="NYT"
          width={24}
          height={28}
          quality={100}
          className="h-7 w-6"
        />
      </div>
    </Button>
  );
}
