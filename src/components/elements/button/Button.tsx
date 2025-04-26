// import React, { useState } from "react";
import { cn } from "../../../lib/utils";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ variant, className, type = "button", children, ...props }) => {
  // const [state, setState] = useState(false);
  const variantButton = `text-white font-bold rounded p-2 ${ variant }`;
  return (
    <button
      // onClick={() => setState(!state)}
      className={cn( className, variantButton )}
      type={ type }
      { ...props }
    >
      {children}
      {/* {state ? "👻" : ""} */}
    </button>
  );
};

export default Button;
