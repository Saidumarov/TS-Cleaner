import { Heading, Text } from "@chakra-ui/react";
import { CardT } from "../../../types";
import "./index.scss";
const Card = ({ title, count }: CardT) => {
  return (
    <>
      <div className="card">
        <div>
          <Heading fontSize={"4xl"}>{count}</Heading>
          <Text fontSize={"2xl"}>{title}</Text>
        </div>
      </div>
    </>
  );
};

export default Card;
