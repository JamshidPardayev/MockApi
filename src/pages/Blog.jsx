import React from "react";
import { api } from "../api";
import { useQuery } from "@tanstack/react-query";

const Blog = () => {
  const { data } = useQuery({
    queryKey: ["blog"],
    queryFn: () => api.get("/blog"),
  });
  console.log(data);
  return (
    <div className="max-w-[1200px] mx-auto px-3 my-[60px]">
      <h2 className="text-[36px] font-semibold text-center mb-10">Blog</h2>
      <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
        {data?.data?.map((blog) => (
          <div
            key={blog?.id}
            className="max-w-[300px] max-sm:mx-auto border border-violet-700 p-2 rounded-[6px] shadow-[0px_0px_10px_2px_#5900ac]"
          >
            <div className="max-w-[300px] overflow-hidden">
              <img
                src={blog?.image}
                alt={blog?.name}
                className="w-full h-full hover:scale-110 duration-300 cursor-pointer"
              />
            </div>
            <div className="flex justify-between mt-2">
              <h3 className="text-[20px] font-semibold">{blog?.name}</h3>
              <p className="text-[20px] font-semibold text-green-800">
                {blog?.age}
              </p>
            </div>
            <div className="flex justify-between">
              <p
                className={`text-[20px] font-semibold ${
                  blog?.isMarried ? "text-green-500" : "text-red-500"
                }`}
              >
                {blog?.isMarried ? "Married" : "NoMarried"}
              </p>

              <p className="text-[20px] font-semibold text-green-900">
                {blog?.profession}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
