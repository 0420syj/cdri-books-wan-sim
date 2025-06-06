import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface Title1Props extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function Title1({ children, className, ...props }: Title1Props) {
  return (
    <h1
      className={cn("font-bold text-2xl/6 tracking-[0%] text-black", className)}
      {...props}
    >
      {children}
    </h1>
  );
}
