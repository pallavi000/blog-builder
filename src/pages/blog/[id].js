import React, { useState } from "react";
import { useRouter } from "next/router";
import Blog from "../../../models/Blog";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

function blogDetail(props) {
  console.log(props.blog, props.user);
  const blog = props.blog;
  const user = props.user;

  return (
    <div className="my-12">
      <div className="font-bold bg-blue-100 py-6 capitalize text-center text-2xl mb-12">
        {blog.title}
        <span className="font-medium font-serif ml-4">- {user.name}</span>
      </div>
      <div className="font-normal font-sans text-lg px-8">{blog.body}</div>
    </div>
  );
}

export default blogDetail;

export async function getServerSideProps(context) {
  const { id } = context.params;
  await dbConnect();

  const blog = await Blog.findById(id).lean();
  const serializedBlog = JSON.parse(JSON.stringify(blog));

  const user = await User.findById(serializedBlog.user_id);
  const serializedUser = JSON.parse(JSON.stringify(user));

  return {
    props: {
      blog: { ...serializedBlog },
      user: { ...serializedUser },
    },
  };
}
