import { signOut } from "next-auth/react";
import React from "react";

function NavBar() {
  return (
    <nav className="bg-slate-500 text-white shadow-lg h-14 items-center flex">
      <h1 className="text-lg ml-5 font-bold font-serif cursor-pointer">
        {window.location.hostname.toUpperCase()}
      </h1>
      <h1 className="text-lg ml-auto font-bold font-serif">
        Remote VBox Manager
      </h1>
      <button
        className="ml-auto mr-5 h-10 flex items-center bg-red-500 rounded px-5 py-3 hover:bg-red-400 align-middle"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </nav>
  );
}

export default NavBar;
