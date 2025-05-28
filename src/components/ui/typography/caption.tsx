import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CaptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function Caption({ children, className, ...props }: CaptionProps) {
  return (
    <p
      className={cn(
        "font-medium text-[16px] leading-[16px] tracking-[0%] text-black",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
