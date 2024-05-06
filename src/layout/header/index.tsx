import { FC, useEffect, useRef, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Input, Layout, theme } from "antd";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoAddCircleOutline, IoSearch } from "react-icons/io5";
import { HeaderProps } from "../../types";
import {
  ChakraProvider,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import useServiceStore from "../../app/service/useServiceStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const { Header } = Layout;
const HeaderComponet: FC<HeaderProps> = ({ state }) => {
  const { render, getService, addService } = useServiceStore();
  const root = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [dataa, setDataa] = useState({
    name: "",
    owner_email: "",
    price: 0,
  });

  const logaut = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const items = [
    {
      key: "1",
      label: <p onClick={logaut}>Logaut</p>,
    },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const Save = () => {
    const data = localStorage.getItem("tokenData");
    if (data) {
      const tokenData = JSON.parse(data);
      const obj = {
        ...dataa,
        owner_email: tokenData.email,
      };
      addService(obj, tokenData.access_token);
    }
    onClose();
    root("/orders");
    toast.success("Buyurtma qo'shildi");
  };

  useEffect(() => {
    const data = localStorage.getItem("tokenData");
    if (data) {
      const tokenData = JSON.parse(data);
      const obj = {
        page: 1,
        limit: 10,
        ownerEmail: tokenData.email,
        token: tokenData.access_token,
      };
      getService(obj);
    }
  }, [render]);

  const handelChange = (name: string, value: any) => {
    setDataa({
      ...dataa,
      [name]: value,
    });
  };

  return (
    <>
      <ChakraProvider>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your Service</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  onChange={(e) => handelChange(e.target.name, e.target.value)}
                  ref={initialRef}
                  placeholder="First name"
                  name="name"
                  required
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Price</FormLabel>
                <Input
                  onChange={(e) => handelChange(e.target.name, +e.target.value)}
                  type="number"
                  placeholder="Price"
                  name="price"
                  required
                />
              </FormControl>
            </ModalBody>
            <ModalFooter className="footer_modal">
              <Button
                disabled={!dataa.name || !dataa.price}
                onClick={Save}
                type="primary"
              >
                Save
              </Button>
              <Button type="dashed" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="header"
        >
          <div className="flex">
            <div className="flex_item" style={{ gap: "30px" }}>
              <Button
                type="text"
                icon={
                  state.collapsed ? (
                    <MenuUnfoldOutlined />
                  ) : (
                    <MenuFoldOutlined />
                  )
                }
                onClick={() => state.setCollapsed(!state.collapsed)}
                style={{
                  fontSize: "16px",
                  width: 100,
                  height: 64,
                }}
                className="siteBarIcon"
              />
              <Button
                className="add"
                style={{ height: "40px", marginLeft: "50px" }}
                type="primary"
                onClick={onOpen}
              >
                <p> Buyurtma qo'shish</p>
                <IoAddCircleOutline fontSize={25} />
              </Button>

              <Input
                size="large"
                prefix={<IoSearch />}
                type="text"
                placeholder="Qidiruv..."
                style={{ height: "40px" }}
                allowClear
                name="search"
              />
            </div>
            <div className="flex_item" style={{ gap: "15px" }}>
              <IoMdNotificationsOutline className="notfication" size={25} />

              <Dropdown
                menu={{ items }}
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
              >
                <Avatar
                  style={{ cursor: "pointer" }}
                  size={40}
                  icon={<UserOutlined />}
                  className="avatar"
                />
              </Dropdown>
            </div>
          </div>
        </Header>
      </ChakraProvider>
    </>
  );
};

export default HeaderComponet;
