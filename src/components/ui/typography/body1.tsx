import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface Body1Props extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function Body1({ children, className, ...props }: Body1Props) {
  return (
    <p
      className={cn(
        "font-medium text-xl/5 tracking-[0%] text-black",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
