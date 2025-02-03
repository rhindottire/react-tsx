import Button from "../elements/button/Button";
import Formel from "../fragments/Formel";

type FormLoginProps = {
  action?: string;
  method?: string;
  children: string;
};

const FormLogin: React.FC<FormLoginProps> = ({ action, method, children }) => {
  return (
    <form action={action} method={method}>
      <Formel
        htmlFor="username"
        children="Username"
        id="username"
        name="username"
        type="text"
        placeholder="Type your Username"
      />
      <Formel
        htmlFor="email"
        children="Email"
        id="email"
        name="email"
        type="text"
        placeholder="example@domain.com"
      />
      <Formel
        htmlFor="password"
        children="Password"
        id="password"
        name="password"
        type="text"
        placeholder="********"
      />
      <Button variant="bg-blue-500">{children}</Button>
    </form>
  );
};

export default FormLogin;