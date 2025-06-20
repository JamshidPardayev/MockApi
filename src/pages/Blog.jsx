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
      <h2 className="text-[30px] font-semibold text-center mb-10">Blog</h2>
      <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
        {data?.data?.map((blog) => (
          <div key={blog?.id} className="max-w-[300px] max-sm:mx-auto">
            <img src={blog?.image} alt={blog?.name} />
            <h3>{blog?.name}</h3>
            <p>{blog?.age}</p>
            <p>{blog?.isMarried}</p>
            <p>{blog?.profession}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
