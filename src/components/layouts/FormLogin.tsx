import { useEffect, useRef } from "react";
import Button from "../elements/button/Button";
import Formel from "../fragments/Formel";
import { login } from "../../services/auth.service";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

type FormLoginProps = {
  text: string
}

interface LoginFormFields extends HTMLFormControlsCollection {
  email?: HTMLInputElement;
  username?: HTMLInputElement;
  password?: HTMLInputElement;
}

const FormLogin: React.FC<FormLoginProps> = ({ text }) => {
  // const [loginFailed, setLoginFailed] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const elements = form.elements as LoginFormFields;

    const data = {
      email: elements.email?.value as string,
      username: elements.username?.value as string,
      password: elements.password?.value as string,
    }

    login(data, (status: boolean, res: string | Error) => {
      if (status) {
        localStorage.setItem("token", res as string);
        window.location.href = "/products";
      } else {
        const error = res as AxiosError;
        Swal.fire({
          title: "Login Failed",
          text: error.response?.data?.toString() || error.message,
          icon: "error"
        });
      }
    });
  };

  const usernameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  return (
    <form onSubmit={ handleLogin }>
      <Formel id="email" type="email" placeholder="john@gmail.com" />
      <Formel id="username" type="text" placeholder="johnd" ref={ usernameRef } />
      <Formel id="password" type="password" placeholder="m38rmF$" />
      <Button className="w-full" variant="bg-blue-500" type="submit">
        { text }
      </Button>
    </form>
  );
};

export default FormLogin;