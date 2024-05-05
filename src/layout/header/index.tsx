import { FC } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Input, Layout, theme } from "antd";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoAddCircleOutline, IoSearch } from "react-icons/io5";
import { HeaderProps } from "../../types";

const { Header } = Layout;
const HeaderComponet: FC<HeaderProps> = ({ state }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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

  return (
    <>
      <Header
        style={{ padding: 0, background: colorBgContainer }}
        className="header"
      >
        <div className="flex">
          <div className="flex_item" style={{ gap: "30px" }}>
            <Button
              type="text"
              icon={
                state.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
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
    </>
  );
};

export default HeaderComponet;
