import FormRegister from "../components/layouts/FormRegister";
import AuthTemplate from "../components/templates/AuthTemplate";

const RegisterPage = () => {
  return (
    <AuthTemplate title="Register" text="Hello there, Sign Up here!" type="Sign-Up">
      <FormRegister children="Sign Up"/>
    </AuthTemplate>
  );
};

export default RegisterPage;
