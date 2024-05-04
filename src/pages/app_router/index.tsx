import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Input, Layout, Menu, theme } from "antd";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { IoSearch, IoSettingsOutline, IoWaterOutline } from "react-icons/io5";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { GrUserSettings } from "react-icons/gr";
import "./index.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Text } from "@chakra-ui/react";

const { Header, Sider, Content } = Layout;

const AppRouter = () => {
  const [collapsed, setCollapsed] = useState(false);
  const root = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const data = [
    {
      key: "/",
      icon: <AiOutlineHome />,
      label: "Asosiy",
    },
    {
      key: "/buyurtmalar",
      icon: <LiaCartArrowDownSolid />,
      label: "Buyurtmalar",
    },

    {
      key: "/mijoslar",
      icon: <FaRegUser />,
      label: "Mijoslar",
    },
    {
      key: "/sms",
      icon: <MdOutlineMarkEmailUnread />,
      label: "SMS marketing",
    },
    {
      key: "/xizmatlar",
      icon: <GrUserSettings />,
      label: "Xizmatlar",
    },
    {
      key: "/sozlamalar",
      icon: <IoSettingsOutline />,
      label: "Sozlamalar",
    },
  ];

  return (
    <Layout>
      <Sider className="home" trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className="logo">
          <IoWaterOutline size={55} color="white" />
          <Text fontSize={"3xl"}>
            Ideal <br /> Cleanig
          </Text>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          items={data}
          onClick={(e) => root(e.key)}
          style={{
            marginTop: "5px",
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="header"
        >
          <div className="flex">
            <div className="flex_item" style={{ gap: "30px" }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 100,
                  height: 64,
                }}
              />
              <Button
                className="add"
                style={{ height: "40px", marginLeft: "50px" }}
                type="primary"
              >
                Buyurtma qo'shish
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
              <IoMdNotificationsOutline size={25} />
              <Avatar
                style={{ cursor: "pointer" }}
                size={40}
                icon={<UserOutlined />}
                className="avatar"
              />
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppRouter;
