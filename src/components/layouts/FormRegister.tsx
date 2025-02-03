import Button from "../elements/button/Button";
import Formel from "../fragments/Formel";

type FormRegisterProps = {
  action?: string;
  method?: string;
  children: string;
};

const FormRegister: React.FC<FormRegisterProps> = ({
  action = "",
  method = "",
  children,
}) => {
  return (
    <form action={action} method={method}>
      <Formel
        htmlFor="username"
        children="Username"
        id="username"
        name="username"
        type="text"
        placeholder="Input your Username"
      />
      <Formel
        htmlFor="email"
        children="Email"
        id="email"
        name="email"
        type="text"
        placeholder="example@domain.com"
      />
      <div className="flex gap-5">
        <Formel
          htmlFor="password"
          children="Password"
          id="password"
          name="password"
          type="password"
          placeholder="********"
        />
        <Formel
          htmlFor="confirmPassword"
          children="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="********"
        />
      </div>
      <Button variant="bg-blue-500">{children}</Button>
    </form>
  );
};

export default FormRegister;
