import { useState, useRef, useEffect } from "react";
import Button from "../elements/button/Button";
import Formel from "../fragments/Formel";
import { Loader2 } from 'lucide-react';
import Swal from "sweetalert2";

type FormRegiserProps = {
  text: string
}

const FormRegister: React.FC<FormRegiserProps> = ({ text }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues(prev => ({ ...prev, [id]: value }));

    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [id]: "" }));
    } // Clear error when user types

    if (id === "confirmPassword" || (id === "password" && formValues.confirmPassword)) {
      if (id === "password" && value !== formValues.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      } else if (id === "confirmPassword" && value !== formValues.password) {
        setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: "" }));
      }
    } // Check password match on the fly
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formValues.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formValues.username) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formValues.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }
    
    if (!formValues.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formValues.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formValues.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Swal.fire({
        title: "Registration Successful!",
        text: "Your account has been created successfully",
        icon: "success",
        confirmButtonText: "Go to Login"
      }).then(() => {
        window.location.href = "/login";
      });
    }, 1500);
  };

  const emailRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div>
        <Formel
          id="email"
          type="email"
          placeholder="example@domain.com"
          value={formValues.email}
          onChange={handleChange}
          ref={emailRef}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
        )}
      </div>

      <div>
        <Formel
          id="username"
          type="text"
          placeholder="Input your Username"
          value={formValues.username}
          onChange={handleChange}
        />
        {errors.username && (
          <p className="text-red-500 text-xs mt-1 ml-1">{errors.username}</p>
        )}
      </div>

      <section aria-label="password" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Formel
            id="password"
            type="password"
            placeholder="********"
            value={formValues.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>
          )}
        </div>

        <div>
          <Formel
            id="confirmPassword"
            type="password"
            placeholder="********"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</p>
          )}
        </div>
      </section>

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

export default FormRegister;