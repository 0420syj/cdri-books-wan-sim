import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CaptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function Caption({ children, className, ...props }: CaptionProps) {
  return (
    <p
      className={cn(
        "font-medium text-base/4 tracking-[0%] text-black",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
