import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SmallProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function Small({ children, className, ...props }: SmallProps) {
  return (
    <p
      className={cn(
        "font-medium text-[10px] leading-[10px] tracking-[0%] text-black",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
