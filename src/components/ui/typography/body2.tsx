import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface Body2Props extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function Body2({ children, className, ...props }: Body2Props) {
  return (
    <p
      className={cn(
        "font-medium text-sm leading-[0.875rem] tracking-[0%] text-black",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
