import React, { useEffect, useRef, useState } from "react";
import { api } from "../api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";

const Blog = () => {
  const queryClient = useQueryClient();
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    profession: "",
    isMarried: "",
  });
  const formRef = useRef(null);
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

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => api.put(`/blog/${id}`, updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      setEditId(null); 
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/blog/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (blog) => {
    setEditId(blog.id);
    setFormData({
      name: blog.name,
      age: blog.age,
      profession: blog.profession,
      isMarried: blog.isMarried ? "true" : "false",
    });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = {
      ...formData,
      isMarried: formData.isMarried === "true",
    };

    if (editId) {
      updateMutation.mutate({ id: editId, updatedBlog: blogData });
    } else {
      postMutation.mutate(blogData);
    }

    setFormData({ name: "", age: "", profession: "", isMarried: "" });
    setEditId(null);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-3 my-[60px]">
      <h2 className="text-[36px] font-semibold text-center mb-10">Blog</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4  mb-10 max-sm:flex max-sm:flex-col"
      >
        <input
          ref={formRef}
          name="name"
          type="text"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded outline-none shadow-[0px_0px_10px_2px_#5900ac] border-violet-600"
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          required
          value={formData.age}
          onChange={handleChange}
          className="border p-2 rounded outline-none shadow-[0px_0px_10px_2px_#5900ac] border-violet-600"
        />
        <input
          name="profession"
          type="text"
          placeholder="Profession"
          required
          value={formData.profession}
          onChange={handleChange}
          className="border p-2 rounded outline-none shadow-[0px_0px_10px_2px_#5900ac] border-violet-600"
        />
        <div className="flex items-center gap-6">
          <label className="font-medium">Married?</label>
          <div className="flex gap-6 mt-2">
            <label>
              <input
                type="radio"
                name="isMarried"
                value="true"
                checked={formData.isMarried === "true"}
                onChange={handleChange}
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="isMarried"
                value="false"
                checked={formData.isMarried === "false"}
                onChange={handleChange}
              />{" "}
              No
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="col-span-2 bg-violet-600 text-white py-2 rounded hover:bg-violet-800 duration-300 cursor-pointer"
        >
          {editId ? "Update Blog" : "Submit Blog"}
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
            <div className="flex justify-between gap-4 mt-2">
              <button
                onClick={() => handleEdit(blog)}
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
