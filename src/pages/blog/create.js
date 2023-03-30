import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { getSession, useSession } from "next-auth/react";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

function create(props) {
  console.log(props, "......................");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [body, setBody] = useState("");
  const { data: session, status } = useSession();
  console.log(session, status);

  const createBlog = (e) => {
    e.preventDefault();
    const data = {
      title,
      subTitle,
      body: body.replace(/<[^>]+>/g, ""),
    };
    console.log(data);
  };

  return (
    <div className="h-screen">
      <div className="bg-red-200 p-4 my-8 text-center self-center font-medium text-lg">
        Publish your passions, your way
      </div>
      <div className="flex justify-center">
        <form
          className="w-1/2 flex flex-col gap-4 "
          onSubmit={(e) => createBlog(e)}
        >
          <div className="flex flex-col">
            <label className="text-md text-gray-700 font-medium">Title</label>
            <input
              className="text-md text-gray-600   bg-white  border-b outline-none border-orange-300"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col">
            <label className="text-md text-gray-700 font-medium ">
              Subtitle
            </label>
            <input
              className="text-md text-gray-600   bg-white border-b outline-none border-orange-300"
              name="subtitle"
              onChange={(e) => setSubTitle(e.target.value)}
            ></input>
          </div>

          <div className="flex flex-col relative mb-8">
            <label className="text-md text-gray-700 font-medium ">Body</label>
            {/* <textarea
              className="text-md text-gray-600   bg-white border outline-none border-orange-300"
              rows={4}
            ></textarea> */}
            <QuillNoSSRWrapper
              modules={modules}
              formats={formats}
              theme="snow"
              name="body"
              onChange={(body) => setBody(body)}
              value={body}
            />
          </div>
          <button className="bg-black text-white font-sans text-lg py-2 px-4 rounded-sm shadow-sm w-fit z-10 mt-16 text-right self-end">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default create;

export async function getServerSideRender(context) {
  const session = await getSession(context);
  console.log(session, "session");

  return {
    props: {
      data: session.user.id,
    },
  };
}
