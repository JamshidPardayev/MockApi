import React, { useEffect } from "react";
import { api } from "../api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";

const Blog = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["blog"],
    queryFn: () => api.get("/blog"),
  });

  const postMutation = useMutation({
    mutationFn: (newBlog) => api.post("/blog", newBlog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/blog/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData);
    body.isMarried = body.isMarried === "true"; 
    postMutation.mutate(body);
    e.target.reset(); 
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleChange = (id) => {
    console.log("Update blog with ID:", id);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-3 my-[60px]">
      <h2 className="text-[36px] font-semibold text-center mb-10">Blog</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-10 max-sm:flex max-sm:flex-col">
        <input name="name" type="text" placeholder="Name" required className="border p-2 rounded outline-none shadow-[0px_0px_10px_2px_#5900ac] border-violet-600" />
        <input name="age" type="number" placeholder="Age" required className="border p-2 rounded outline-none shadow-[0px_0px_10px_2px_#5900ac] border-violet-600" />
        <input name="profession" type="text" placeholder="Profession" required className="border p-2 rounded outline-none shadow-[0px_0px_10px_2px_#5900ac] border-violet-600" />
        <div className="flex items-center gap-6">
          <label className="font-medium">Married?</label>
          <div className="flex gap-6 mt-2">
            <label>
              <input type="radio" name="isMarried" value="true" required /> Yes
            </label>
            <label>
              <input type="radio" name="isMarried" value="false" required /> No
            </label>
          </div>
        </div>
        <button type="submit" className="col-span-2 bg-violet-600 text-white py-2 rounded hover:bg-violet-800 duration-300 cursor-pointer">
          Submit
        </button>
      </form>

      <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
        {data?.data?.map((blog) => (
          <div
            key={blog?.id}
            data-aos="flip-right"
            className="max-w-[300px] max-sm:w-[300px] max-sm:mx-auto border border-violet-700 p-2 rounded-[6px] shadow-[0px_0px_10px_2px_#5900ac]"
          >
            <div className="max-w-[300px] overflow-hidden">
              <img
                src={blog?.image}
                alt={blog?.name}
                className="w-full h-[250px] object-cover hover:scale-110 duration-300 cursor-pointer"
              />
            </div>
            <div className="flex justify-between mt-2">
              <h3 className="text-[20px] font-semibold">{blog?.name}</h3>
              <p className="text-[20px] font-semibold text-green-800">{blog?.age}</p>
            </div>
            <div className="flex justify-between">
              <p className={`text-[20px] font-semibold ${blog?.isMarried ? "text-green-500" : "text-red-500"}`}>
                {blog?.isMarried ? "Married" : "NoMarried"}
              </p>
              <p className="text-[20px] font-semibold text-green-900">{blog?.profession}</p>
            </div>
            <div className="flex justify-between gap-4 mt-2">
              <button
                onClick={() => handleChange(blog?.id)}
                className="w-full h-[40px] bg-green-600 hover:bg-green-800 text-white rounded-[5px] cursor-pointer"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(blog?.id)}
                className="w-full h-[40px] bg-red-600 hover:bg-red-800 text-white rounded-[5px] cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
