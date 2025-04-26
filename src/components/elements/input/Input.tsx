import { forwardRef } from "react";

type InputProps = {
  id: string;
  name: string;
  type: string;
  placeholder: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { id, name, type, placeholder, ...rest } = props;
  return (
    <input
      id={id}
      name={name}
      type={type}
      className="text-sm border rounded w-full py-2 px-3 placeholder:opacity-50"
      placeholder={placeholder}
      autoComplete="off"
      ref={ ref }
      { ...rest }
    />
  );
});

export default Input;