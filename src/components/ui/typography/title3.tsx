import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface Title3Props extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function Title3({ children, className, ...props }: Title3Props) {
  return (
    <h1
      className={cn(
        "font-bold text-[18px] leading-[18px] tracking-[0%] text-black",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}
