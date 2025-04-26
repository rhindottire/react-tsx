import { forwardRef } from "react";
import { capitalize } from "../../lib/utils";
import Label from "../elements/input/Label";
import Input from "../elements/input/Input";

type FormelProps = {
  id: string;
  type: string;
  placeholder: string;
};

const Formel = forwardRef<HTMLInputElement, FormelProps>(
  ({ id, type, placeholder }, ref) => {
    return (
      <div className="mb-6">
        <Label htmlFor={ id }>
          {capitalize( id )}
        </Label>
        <Input
          id={ id }
          name={ id }
          type={ type }
          placeholder={ placeholder }
          ref={ ref }
        />
      </div>
    );
  }
);
Formel.displayName = "Formel";

export default Formel;