import { useLogin } from "../hooks/useLogin"

const ProfilePage = () => {
  const user = useLogin();
  return (
    <h1>{ user }</h1>
  );
};

export default ProfilePage;