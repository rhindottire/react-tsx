import { forwardRef, useState } from "react";
import { capitalize, cn } from "../../lib/utils";
import { useDarkMode } from "../../hooks/useDarkMode";

type FormelProps = {
  id: string;
  type: string;
  placeholder: string;
  className?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Formel = forwardRef<HTMLInputElement, FormelProps>(
  ({ id, type, placeholder, className, ...props }, ref) => {
    const { isDarkMode } = useDarkMode();
    const [isFocused, setIsFocused] = useState(false);
    
    const label = capitalize(id)
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());

    return (
      <div className="mb-4 relative">
        <label
          htmlFor={id}
          className={cn(
            "absolute left-3 transition-all duration-200 pointer-events-none",
            isFocused || props.value
              ? `top-1 text-xs ${isDarkMode ? 'text-blue-600' : 'text-neutral-950'}`
              : `top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-blue-400' : 'text-neutral-900'}`
          )}
        >
          {label}
        </label>

        <input
          id={id}
          name={id}
          type={type}
          ref={ref}
          placeholder={isFocused ? placeholder : ""}
          className={cn(
            "w-full px-3 pt-6 pb-2 rounded-lg border",
            "focus:outline-none focus:ring-2 transition-all duration-200",
            isDarkMode
              ? "text-white bg-neutral-950 placeholder-neutral-500"
              : "text-black bg-transparent",
            isFocused
              ? `border-blue-500 ${isDarkMode ? 'ring-blue-900' : 'ring-blue-200'}`
              : "border-neutral-300",
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => setIsFocused(!!e.target.value)}
          {...props}
        />
      </div>
    );
  }
);
Formel.displayName = "Formel";

export default Formel;