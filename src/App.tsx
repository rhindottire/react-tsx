import React, { useState } from "react";
import cn from "./lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, className, variant }) => {
  // const { children, variant } = props;
  const [state, setState] = useState(false);
  const variantButton = `h-10 px-6 text-white font-bold rounded bg-${variant}-500 hover:bg-${variant}-700`
  return (
    <button
      onClick={() => setState(!state)}
      className={cn(className, variantButton)}
    >
      {children} {state ? "👻" : ""}
    </button>
  );
};

function App() {
  return (
    <div className="bg-black flex justify-center items-center min-h-screen">
      <div className="flex gap-x-3">
        <Button variant="blue">Login</Button>
        <Button variant="red">Logout</Button>
        <Button variant="yellow">Register</Button>
      </div>
    </div>
  );
}

export default App;
