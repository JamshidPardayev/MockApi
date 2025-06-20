import { Button } from "antd";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="shadow-xl">
      <div className=" max-w-[1200px] justify-between mx-auto h-[100px] px-3 flex items-center gap-3">
        <img
          src="../../public/logo.png"
          alt="logo"
          className="h-[100px] w-[200px]"
        />
        <ul className="flex gap-5">
          <li>
            <Link to={"/"} className="text-[18px] font-semibold hover:text-gray-800 duration-300 cursor-pointer">Home</Link>
          </li>
          <li>
            <Link to={"/blog"} className="text-[18px] font-semibold hover:text-gray-800 duration-300 cursor-pointer">Blog</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
