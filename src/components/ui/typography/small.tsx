import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SmallProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function Small({ children, className, ...props }: SmallProps) {
  return (
    <p
      className={cn(
        "font-medium text-[0.625rem] leading-[0.625rem] tracking-[0%] text-black",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
