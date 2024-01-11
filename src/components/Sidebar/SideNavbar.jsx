import { SignInButton } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../Theme/ThemeToggle";

export default function SideNavbar() {
  return (
    <nav className="fixed top-0 z-50 w-full navbar">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <Link to="/" className="flex ms-2 md:me-24">
              <div className="flex w-screen">
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap ml-3">
                  Trackalack
                </span>
              </div>
            </Link>
            <div className="flex justify-end right-3 z-30">
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
