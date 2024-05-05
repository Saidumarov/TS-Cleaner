import {
  Button,
  ChakraProvider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "../../app/auth/useAuthStore";
const Login = () => {
  const { login, loading, error, loginData } = useAuthStore();
  const toast = useToast();
  const root = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  // login
  const handelSubmit = (e: any) => {
    e.preventDefault();
    login(data);
  };

  // data
  const handelChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (error) {
      toast({
        position: "top-right",
        description: "Email yoki parol noto'g'ri",
        status: "error",
        isClosable: true,
      });
    }
    if (loginData?.id) {
      localStorage.setItem("tokenData", JSON.stringify(loginData));
      return root("/");
    }
  }, [error, loginData]);

  useEffect(() => {
    const user = localStorage.getItem("tokenData");
    if (user) {
      return root("/");
    }
  }, []);
  return (
    <ChakraProvider>
      <div className="login_wrapper">
        <div className="container">
          <div className="login_item">
            <Heading>Tizimga kirish</Heading>
            <form onSubmit={(e) => handelSubmit(e)}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  isRequired
                  onChange={handelChange}
                  name="email"
                  type="email"
                  placeholder="email@gmail.com"
                />
              </FormControl>
              <FormControl>
                <div className="label_password">
                  <FormLabel>Parol</FormLabel>
                  <FormLabel>
                    <Link to={"/forgot-password"}>Parolni unidingizmi ?</Link>
                  </FormLabel>
                </div>
                <Input
                  isRequired
                  name="password"
                  onChange={handelChange}
                  type="password"
                  placeholder="********"
                />
              </FormControl>
              {loading ? (
                <Button isLoading></Button>
              ) : (
                <Button type="submit">Tizimga kirish</Button>
              )}
              <p className="not_user">
                Hisobingiz yuqmi ?{" "}
                <Link className="link" to={"/register"}>
                  Ro'yhatdan o'tish
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default Login;
