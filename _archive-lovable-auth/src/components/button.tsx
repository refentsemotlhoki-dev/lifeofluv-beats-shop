import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "platinum" | "ghost";
};

export function Button({ variant = "platinum", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`btn-base ${variant === "platinum" ? "btn-platinum" : "btn-ghost"} ${className}`}
      {...props}
    />
  );
}