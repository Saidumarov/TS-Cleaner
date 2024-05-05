import { useEffect, useState } from "react";
import { Layout } from "antd";
import "./index.scss";
import { Outlet } from "react-router-dom";
import SiteBar from "./site_bar";
import HeaderComponet from "./header";
const { Content } = Layout;

const AppRouter = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 715) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout>
      <SiteBar state={{ collapsed }} />
      <Layout>
        <HeaderComponet state={{ collapsed, setCollapsed }} />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppRouter;
