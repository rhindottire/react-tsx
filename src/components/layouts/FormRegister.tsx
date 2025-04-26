import Button from "../elements/button/Button";
import Formel from "../fragments/Formel";

type FormRegisterProps = {
  text: string;
};

const FormRegister: React.FC<FormRegisterProps> = ({ text }) => {
  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const form = e.currentTarget;
    // console.log((form.querySelector("#username") as HTMLInputElement)?.value);
    // console.log((form.querySelector("#email") as HTMLInputElement)?.value);
    // console.log((form.querySelector("#password") as HTMLInputElement)?.value);
    // console.log("login 👻");
  };
  return (
    <form onSubmit={handleRegister}>
      <Formel id="email" type="text" placeholder="example@domain.com" />
      <Formel id="username" type="text" placeholder="Input your Username" />
      <div className="flex gap-5">
        <Formel id="password" type="password" placeholder="********" />
        <Formel id="confirmPassword" type="password" placeholder="********" />
      </div>
      <Button className="w-full" variant="bg-blue-500" type="submit">
        {text}
      </Button>
    </form>
  );
};

export default FormRegister;
