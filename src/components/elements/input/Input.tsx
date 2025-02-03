type InputProps = {
  id: string;
  name: string;
  type: string;
  placeholder: string;
};

const Input: React.FC<InputProps> = ({ id, name, type, placeholder }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      className="text-sm border rounded w-full py-2 px-3 placehorder: opacity-50"
      placeholder={placeholder}
      autoComplete="off"
    />
  );
};

export default Input;