import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="px-1 py-5 w-full max-w-5xl mx-auto border-b border-gray-200">
      <Link className="font-semibold text-3xl" href={"/"}>
        <p>
          ithasbeen<span className="text-blue italic">X</span>days
        </p>
      </Link>
      {/* <button className="text-base py-3 px-6 rounded-md font-semibold bg-sky-200 hover:cursor-pointer hover:scale-[98%] ease-in-out duration-100">
        Elon Musk
      </button> */}
    </div>
  );
};

export default Header;
