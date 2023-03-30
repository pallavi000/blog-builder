import React from "react";
import heroImg from "../../images/hero.jpeg";
import Image from "next/image";
import Link from "next/link";

function index() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
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
          {arr.map((a) => {
            return (
              <div className="shadow-md rounded-md p-8 h-48 bg-red-200 flex justify-center ">
                <div>START WITH HAWLEY </div>
              </div>
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
