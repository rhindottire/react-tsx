import React from "react";
import { cn } from "../../../lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  variant?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  type = "button",
  onClick,
  disabled = false,
  ...props
}) => {
  const baseStyles = "relative px-4 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",
    outline: "bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20",
  };

  // Use the variant if it's one of our predefined ones, otherwise use it as a class
  const buttonVariant = variantStyles[variant as keyof typeof variantStyles] || variant;

  return (
    <button
      type={type}
      className={cn(
        baseStyles,
        buttonVariant,
        disabled && "opacity-50 cursor-not-allowed",
        "transform hover:-translate-y-0.5 active:translate-y-0",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {/* Add subtle loading or ripple effects here if needed */}
    </button>
  );
};

export default Button;