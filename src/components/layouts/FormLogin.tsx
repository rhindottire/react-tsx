import { useEffect, useRef, useState } from "react";
import Button from "../elements/button/Button";
import Formel from "../fragments/Formel";
import { login } from "../../services/auth.service";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { Loader2 } from 'lucide-react';

type FormLoginProps = {
  text: string;
};

// interface LoginFormFields extends HTMLFormControlsCollection {
//   email?: HTMLInputElement;
//   username?: HTMLInputElement;
//   password?: HTMLInputElement;
// }

const FormLogin: React.FC<FormLoginProps> = ({ text }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues(prev => ({ ...prev, [id]: value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = {
        email: formValues.email,
        username: formValues.username,
        password: formValues.password,
      };

      login(data, (status: boolean, res: string | Error) => {
        setIsLoading(false);

        if (status) {
          localStorage.setItem("token", res as string);
          Swal.fire({
            title: "Success!",
            text: "You have successfully logged in",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            window.location.href = "/products";
          });
        } else {
          const error = res as AxiosError;
          Swal.fire({
            title: "Login Failed",
            text: error.response?.data?.toString() || error.message,
            icon: "error"
          });
        }

      });
    } catch (error) {
      setIsLoading(false);
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred: " + error,
        icon: "error"
      });
    }
  };

  const usernameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <Formel
        id="username"
        type="text"
        placeholder="johnd"
        ref={usernameRef}
        value={formValues.username}
        onChange={handleChange}
      />

      <Formel
        id="email"
        type="email"
        placeholder="john@gmail.com"
        value={formValues.email}
        onChange={handleChange}
      />

      <Formel
        id="password"
        type="password"
        placeholder="m38rmF$"
        value={formValues.password}
        onChange={handleChange}
      />

      <Button
        className="w-full mt-6"
        variant="primary"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
            Processing...
          </>
        ) : (
          text
        )}
      </Button>
    </form>
  );
};

export default FormLogin;