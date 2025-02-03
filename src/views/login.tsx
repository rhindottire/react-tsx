import FormLogin from "../components/layouts/FormLogin";
import AuthTemplate from "../components/templates/AuthTemplate";

const LoginPage = () => {
  return (
    <AuthTemplate title="Login" text="Wassup My Nibba, Sign In here!" type="Sign-In">
      <FormLogin children="Sign In" />
    </AuthTemplate>
  );
};

export default LoginPage;
