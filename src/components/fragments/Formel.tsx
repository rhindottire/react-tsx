import React from "react";
import Input from "../elements/input/Input";
import Label from "../elements/input/Label";

type FormelProps = {
  htmlFor: string;
  children: React.ReactNode;
  id: string;
  name: string;
  type: string;
  placeholder: string;
};

const Formel: React.FC<FormelProps> = ({
  htmlFor,
  children,
  id,
  name,
  type,
  placeholder,
}) => {
  return (
    <div className="mb-6">
      <Label htmlFor={htmlFor}>{children}</Label>
      <Input id={id} name={name} type={type} placeholder={placeholder} />
    </div>
  );
};

export default Formel;