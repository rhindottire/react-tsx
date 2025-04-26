import { useEffect, useRef } from "react";
import Button from "../elements/button/Button";
import Formel from "../fragments/Formel";

type FormLoginProps = {
  text: string;
};

const FormLogin: React.FC<FormLoginProps> = ({ text }) => {

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    // console.log((form.querySelector("#email") as HTMLInputElement)?.value);
    // console.log((form.querySelector("#username") as HTMLInputElement)?.value);
    // console.log((form.querySelector("#password") as HTMLInputElement)?.value);
    // console.log("login 👻");
    localStorage.setItem( "email", (form.querySelector("#email") as HTMLInputElement)?.value);
    localStorage.setItem( "username", (form.querySelector("#username") as HTMLInputElement)?.value);
    localStorage.setItem( "password", (form.querySelector("#password") as HTMLInputElement)?.value);
    window.location.href = "/products";
  };

  const emailRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <form onSubmit={ handleLogin }>
      <Formel id="email" type="text" placeholder="example@domain.com" ref={ emailRef } />
      <Formel id="username" type="text" placeholder="Type your Username" />
      <Formel id="password" type="password" placeholder="********" />
      <Button className="w-full" variant="bg-blue-500" type="submit">
        { text }
      </Button>
    </form>
  );
};

export default FormLogin;