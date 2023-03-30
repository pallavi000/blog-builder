import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      router.push("/");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="  p-5 flex flex-col items-center  w-screen">
      <form
        className="flex flex-col gap-4 bg-gray-400 p-16 w-1/2 rounded-md"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="font-medium text-xl text-gray-800 text-center">
          Login
        </div>

        <input
          className=" text-md text-gray-600 outline-blue-300 rounded-md py-3 px-2"
          placeholder="Enter email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className=" text-md text-gray-600 outline-blue-300 rounded-md py-3 px-2"
          placeholder="Enter password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className=" bg-gray-700 text-white  hover:bg-gray-600 py-3 px-5 mt-2 w-fit self-center rounded-md shadow-sm">
          Submit
        </button>
      </form>
    </div>
  );
}

export default login;
