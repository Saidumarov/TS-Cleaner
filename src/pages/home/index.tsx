import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BannerCard, Cards } from "../../db/card";
import Card from "../../components/shared/card/card";
import "./index.scss";
import { ChakraProvider, Heading, Text } from "@chakra-ui/react";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
const Home = () => {
  const root = useNavigate();
  const [text, seTtext] = useState("Oylik");

  useEffect(() => {
    const user = localStorage.getItem("tokenData");
    if (!user) {
      return root("/login");
    }
  }, []);

  const items = [
    {
      label: "Oylik",
      key: "Oylik",
    },
    {
      label: "Haftalik",
      key: "Haftalik",
    },
    {
      label: "Kunlik",
      key: "Kunlik",
    },
  ];

  const onClick = ({ key }: { key: string }) => {
    seTtext(key);
  };

  return (
    <ChakraProvider>
      <div className="hom_cards">
        {Cards.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
      <div className="banner_cards">
        <div className="banner_title">
          <Heading>Buyurtmalar</Heading>
          <Dropdown menu={{ items, onClick }}>
            <Space style={{ cursor: "pointer" }}>
              <Text fontSize={"20px"}>{text}</Text>
              <DownOutlined />
            </Space>
          </Dropdown>
        </div>
        <div className="banner_cards_w">
          {BannerCard.map((item, index) => (
            <div className="banner_card" key={index}>
              <Text fontSize={"2xl"}>{item?.title}</Text>
              <Heading>{item.count}</Heading>
            </div>
          ))}
        </div>
      </div>
    </ChakraProvider>
  );
};

export default Home;
