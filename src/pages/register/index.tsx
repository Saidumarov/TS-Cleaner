import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  PinInput,
  PinInputField,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import { IoChevronBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import useAuthStore from "../../app/auth/useAuthStore";

const Register = () => {
  const root = useNavigate();
  const { register, registerData, verify, verifyData, loading, error } =
    useAuthStore();
  const [confirmPassword, setconfirmPassword] = useState();
  const [activeCode, setActiveCode] = useState(true);
  const [pin, setPin] = useState("");
  const toast = useToast();
  const [data, setData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    password: "",
  });

  // register submit
  const handelSubmit = (e: any) => {
    e.preventDefault();
    register(data);
  };

  // data
  const handelChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // disabled
  const disabled = () => {
    if (
      !data.full_name ||
      !data.phone_number ||
      !data.email ||
      !data.password ||
      !confirmPassword
    ) {
      return true;
    } else if (data.password !== confirmPassword) {
      return true;
    } else if (data.password.length < 6) {
      return true;
    } else {
      return false;
    }
  };

  // Opt

  const handleChange = (value: string) => {
    setPin(value);
  };

  const handelVerify = () => {
    const code = {
      code: pin,
      email: JSON.parse(localStorage.getItem("emailUser") || ""),
    };
    verify(code);
  };

  useEffect(() => {
    if (registerData) {
      setActiveCode(false);
      localStorage.setItem("emailUser", JSON.stringify(data.email));
    }
    if (error) {
      toast({
        position: "top-right",
        description: "Email yoki parol noto'g'ri",
        status: "error",
        isClosable: true,
      });
    }
    if (verifyData.id) {
      localStorage.setItem("tokenData", JSON.stringify(verifyData));
      return root("/");
    }
  }, [verifyData, registerData, error]);

  useEffect(() => {
    const user = localStorage.getItem("tokenData");
    if (user) {
      return root("/");
    }
  }, []);

  return (
    <div className="register_wrapper">
      <div className="container">
        <div onClick={() => root(-1)} className="back">
          <IoChevronBack />
          <p>Orqaga</p>
        </div>
        {activeCode ? (
          <div className="register_item">
            <Heading>Ro'yxatdan o'tish</Heading>
            <form onSubmit={(e) => handelSubmit(e)}>
              <FormControl>
                <FormLabel>Ismingiz</FormLabel>
                <Input
                  isRequired
                  onChange={handelChange}
                  name="full_name"
                  type="name"
                  placeholder="Full Name"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Telifon raqamingiz</FormLabel>
                <Input
                  isRequired
                  onChange={handelChange}
                  name="phone_number"
                  type="tel"
                  pattern="[+]{1}[0-9]{3}[0-9]{9}"
                  placeholder="+998XXXXXXXXX"
                  maxLength={13}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  isRequired
                  onChange={handelChange}
                  name="email"
                  type="email"
                  placeholder="email@.com"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Parol</FormLabel>
                <Input
                  isRequired
                  onChange={handelChange}
                  name="password"
                  type="password"
                  placeholder="Apple06"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Parolni tasdiqlash</FormLabel>
                <Input
                  isRequired
                  onChange={(e: any) => setconfirmPassword(e.target.value)}
                  name="confirmPassword"
                  type="password"
                  placeholder="Apple06"
                />
              </FormControl>
              {loading ? (
                <Button isLoading></Button>
              ) : (
                <Button isDisabled={disabled()} type="submit">
                  Ro'yxatdan o'tish
                </Button>
              )}
              <p className="not_user">
                Ro'yxatdan o'tganmisiz ?
                <Link className="link" to={"/login"}>
                  Tizimga kirish
                </Link>
              </p>
            </form>
          </div>
        ) : (
          <div className="verify_code">
            <Heading>Kodni kriting</Heading>
            <HStack className="opt">
              <PinInput onChange={(e) => handleChange(e)}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            {loading ? (
              <Button isLoading></Button>
            ) : (
              <Button
                onClick={handelVerify}
                isDisabled={pin?.length < 6}
                type="submit"
              >
                Tasdiqlash
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
