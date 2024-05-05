import { Link } from "react-router-dom";
import "./index.scss";
const NotFound = () => {
  return (
    <div className="notfount_Page">
      <h1>Hech narsa yoʻq :(</h1>
      <hr />
      <Link to={"/"}>
        <p>Bosh sahifaga qaytish</p>
      </Link>
    </div>
  );
};

export default NotFound;
