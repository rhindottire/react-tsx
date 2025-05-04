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
import { Provider } from "react-redux";
import store from "./redux/store";
import DarkModeProvider from "./contexts/DarkModeContextProvider";
import { TotalPriceProvider } from "./contexts/TotalPriceContextProvider";
import Root from "./views/root";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
    element: <ProfilePage />,
  },
  {
    path: "/product/:id", // dynamic routing
    element: <ProductPage />,
  },
]);

createRoot(document.querySelector("#root")!,{
  identifierPrefix: "react-tsx"
}).render(
  <StrictMode>
    <DarkModeProvider>
      <Provider store={ store }>
        <TotalPriceProvider>
          <RouterProvider router={ routers } />
        </TotalPriceProvider>
      </Provider>
    </DarkModeProvider>
  </StrictMode>
);