import React, { useState } from "react";
import cn from "../../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  variant,
  className,
  type = "button",
  children,
}) => {
  const [state, setState] = useState(false);
  const variantButton = `h-10 px-6 text-white font-bold rounded w-full ${variant}`;
  return (
    <button
      onClick={() => setState(!state)}
      className={cn(className, variantButton)}
      type={type}
    >
      {children} {state ? "👻" : ""}
    </button>
  );
};

export default Button;
