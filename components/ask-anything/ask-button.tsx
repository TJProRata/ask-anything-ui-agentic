import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AskButtonProps extends React.ComponentProps<typeof Button> {
  className?: string;
  logoSrc?: string;
  logoAlt?: string;
}

export function AskButton({ 
  className, 
  logoSrc = "/daily-mail.png",
  logoAlt = "Daily Mail",
  ...props 
}: AskButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "relative flex w-32 h-12 items-center justify-between gap-2.5 rounded-[40px] px-1 py-0",
        "bg-white/80 backdrop-blur-sm",
        "border border-[#6f61ef] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)]",
        "transition-all duration-200 hover:shadow-lg hover:border-[#6f61ef]/80",
        "min-w-[120px]",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 items-center gap-1.5 px-2">
        <Image
          src="/sparkle.svg"
          alt="Sparkle"
          width={24}
          height={24}
          className="size-6"
        />
        <span 
          className="font-sans text-base font-normal tracking-[-0.32px] bg-gradient-to-l from-[#36e1ae] to-[#6f61ef] bg-clip-text text-transparent"
          style={{ WebkitTextFillColor: "transparent" }}
        >
          Ask
        </span>
      </div>
      
      <div className="size-10 shrink-0 overflow-hidden rounded-full bg-white">
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={40}
          height={40}
          className="size-full object-contain"
        />
      </div>
    </Button>
  );
}
