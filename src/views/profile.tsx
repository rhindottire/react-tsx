import Counter from "../components/layouts/Counter";
import { useLogin } from "../hooks/useLogin"

const ProfilePage = () => {
  const user = useLogin();
  return (
    <section aria-label="count">
      <Counter />
      <h1 className="flex justify-center items-center text-9xl">Username : { user }</h1>
    </section>
  );
};

export default ProfilePage;