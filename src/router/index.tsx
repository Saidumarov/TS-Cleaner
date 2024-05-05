import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import ForgotPassword from "../pages/forgot-password";
import AppRouter from "../layout";
import Orders from "../pages/cart";
import Client from "../pages/client";
import SMS from "../pages/email";
import Settings from "../pages/settings";
import Servece from "../pages/service";
import NotFound from "../pages/not-found";

const RouterPage = () => {
  return (
    <>
      <Routes>
        <Route element={<AppRouter />}>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/clients" element={<Client />} />
          <Route path="/sms" element={<SMS />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/service" element={<Servece />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default RouterPage;
