import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface Title2Props extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function Title2({ children, className, ...props }: Title2Props) {
  return (
    <h2
      className={cn(
        "font-bold text-[22px] leading-[24px] tracking-[0%] text-black",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}
