import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const root = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("tokenData");
    if (!user) {
      return root("/login");
    }
  }, []);
  return (
    <div>
      <div onClick={() => root("/register")}>home</div>
    </div>
  );
};

export default Home;
