import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="max-w-[1200px] px-3 mx-auto bg-gray-900 text-white py-6 text-sm mt-auto">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="hover:text-gray-300 duration-300 cursor-pointer">MyWebsite. Barcha huquqlar himoyalangan.</p>

          <div className="flex gap-6 flex-wrap">
              <p  className="hover:text-gray-300 duration-300 cursor-pointer">Foydalanuvchilar</p>
              <p  className="hover:text-gray-300 duration-300 cursor-pointer">Blog</p>
              <p  className="hover:text-gray-300 duration-300 cursor-pointer">Maxfiylik</p>
              <p  className="hover:text-gray-300 duration-300 cursor-pointer">Shartlar</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
