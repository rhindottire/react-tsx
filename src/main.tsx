import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // global css
// import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./views/login";
import RegisterPage from "./views/register";
import ErrorPage from "./views/404";
import ProfilePage from "./views/profile";
import ProductsPage from "./views/products";
import ProductPage from "./views/product";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <h1>Hello World!</h1>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />
  },
  {
    path: "/product/:id", // dynamic routing
    element: <ProductPage />
  }
]);

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <RouterProvider router={routers} />
  </StrictMode>,
)