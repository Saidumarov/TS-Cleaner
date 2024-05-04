import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  PinInput,
  PinInputField,
  Text,
  useToast,
} from "@chakra-ui/react";
import useAuthStore from "../../app/auth/useAuthStore";
import "./index.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
const ForgotPassword = () => {
  const root = useNavigate();
  const {
    forgotPasswordVerify,
    loading,
    error,
    forgotPassword,
    forgotPasswordData,
    forgotPasswordVerifyData,
  } = useAuthStore();
  const [activeForgot, setactiveForgot] = useState(false);
  const [pin, setPin] = useState("");
  const toast = useToast();

  const [email, setEmail] = useState({
    email: "",
  });
  const [forgotData, setforgotData] = useState({
    email: "",
    new_password: "",
    code: "",
  });
  const handelChange = (name: string, value: string) => {
    setforgotData({ ...forgotData, [name]: value, code: pin });
  };

  useEffect(() => {
    if (forgotPasswordData) {
      setactiveForgot(true);
    }
    if (error) {
      toast({
        position: "top-right",
        description: "Email yoki kod noto'g'ri",
        status: "error",
        isClosable: true,
      });
    }
    if (forgotPasswordVerifyData) {
      toast({
        position: "top-right",
        description: "Update password",
        status: "success",
        isClosable: true,
      });
      return root("/login");
    }
  }, [error, forgotPasswordData, forgotPasswordVerifyData]);

  return (
    <div>
      <div className="forgot_wrapper">
        <div className="container">
          <div onClick={() => root(-1)} className="back">
            <IoChevronBack />
            <p>Orqaga</p>
          </div>
          <div className="forgot_item">
            {activeForgot ? (
              <form
                onSubmit={(e) => (
                  e.preventDefault(), forgotPasswordVerify(forgotData)
                )}
              >
                <FormLabel>Kodni kiriting</FormLabel>
                <HStack className="opt">
                  <PinInput onChange={(e) => setPin(e)}>
                    <PinInputField required />
                    <PinInputField required />
                    <PinInputField required />
                    <PinInputField required />
                    <PinInputField required />
                    <PinInputField required />
                  </PinInput>
                </HStack>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    isRequired
                    onChange={(e) =>
                      handelChange(e.target.name, e.target.value)
                    }
                    name="email"
                    type="email"
                    placeholder="email@gmail.com"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Yangi Parol</FormLabel>
                  <Input
                    isRequired
                    name="new_password"
                    onChange={(e) =>
                      handelChange(e.target.name, e.target.value)
                    }
                    type="password"
                    placeholder="********"
                  />
                </FormControl>
                {loading ? (
                  <Button isLoading></Button>
                ) : (
                  <Button type="submit">Tasdiqlash</Button>
                )}
              </form>
            ) : (
              <>
                <Heading textAlign={"center"}>Parolni tiklash</Heading>
                <Text fontSize="2xl" textAlign={"center"} fontWeight={600}>
                  Sizga kod yuborishimiz uchun email'ingizni kiriting
                </Text>
                <form
                  className="forgotPassword"
                  onSubmit={(e) => (e.preventDefault(), forgotPassword(email))}
                >
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      isRequired
                      onChange={(e) =>
                        setEmail({
                          email: e.target.value,
                        })
                      }
                      name="email"
                      type="email"
                      placeholder="email@gmail.com"
                    />
                  </FormControl>
                  {loading ? (
                    <Button isLoading></Button>
                  ) : (
                    <Button type="submit">Kodni yuborish</Button>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
