import { getSession, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";

function Navbar() {
  const { data: session, status } = useSession();

  return (
    <div className="flex justify-between items-center bg-gray-800 text-white text-lg py-4 px-4">
      <div className="flex items-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/blog">Blogs</Link>
      </div>
      {status == "authenticated" ? (
        <div className="cursor-pointer" onClick={() => signOut()}>
          SignOut
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link href="/auth/login">Login</Link>
          <Link href="/auth/register">Register</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
