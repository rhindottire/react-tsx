import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <div className="bg-black text-white flex justify-center items-center min-h-screen flex-col">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-xl">{error.statusText || error.message}</p>
    </div>
  );
};

export default ErrorPage;