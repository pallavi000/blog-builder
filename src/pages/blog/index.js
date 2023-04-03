import React, { useState } from "react";
import heroImg from "../../images/hero.jpeg";
import Image from "next/image";
import Link from "next/link";
import { getSession } from "next-auth/react";
import Blog from "../../../models/Blog";
import dbConnect from "../../../utils/dbConnect";

function index(props) {
  console.log(props.data, "seeee");
  const blogs = props.data;

  return (
    <div className="p-10 w-full">
      <div className="font-medium text-5xl align-middle w-1/3 font-serif mb-20">
        Make any template yours with ease.
      </div>
      <div className="my-4 mt-8 mb-8">
        <div className="text-gray-800 font-medium text-2xl mb-8 ">
          Recommended starting points
        </div>
        <div className="grid grid-cols-4 gap-8 ">
          {blogs.map((blog) => {
            return (
              <Link
                href={`/blog/${blog._id}`}
                className="shadow-md rounded-md p-8 h-48 bg-red-200 flex justify-center flex-col gap-1 "
              >
                <div className="font-medium text-lg  hover:translate-x-0 ease-in-out duration-300">
                  {blog.title}{" "}
                </div>
                <div className="line-clamp-1">{blog.body}</div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex p-4 ">
        <div className="bg-black text-white p-8 flex flex-col ">
          <div className="font-bold text-4xl font-sans mb-8">
            Build your own template
          </div>
          <div className="font-medium text-md">
            Choose from expertly curated colors, fonts, and page layouts to
            create a website template that matches your vision.
          </div>
          <Link
          {}
            href="/blog/create"
            className="bg-white py-3 px-6 w-fit text-black text-sm  mt-16 font-sans flex gap-2 cursor-pointer"
          >
            Get Started
            <i class="fa-regular fa-arrow-right "></i>
          </Link>
        </div>
        <div>
          <Image src={heroImg} alt="Picture of the author" quality={100} />
        </div>
      </div>
    </div>
  );
}

export default index;

export async function getServerSideProps(context) {
  await dbConnect();

  let blogs = await Blog.find().lean();
  let serializedBlogs = JSON.parse(JSON.stringify(blogs));

  return {
    props: {
      data: serializedBlogs,
    },
  };
}
