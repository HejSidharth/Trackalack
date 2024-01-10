import React from "react";
import ThemeToggle from "./Theme/ThemeToggle";
import { Link } from "react-router-dom";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function Navbar() {
  return (
    <>
      <header class="flex flex-wrap sm:justify-start sm:flex-nowrap w-full py-2 top-0 sticky backdrop-blur border-b border-neutral z-50 hero-pattern">
        <nav
          class="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center  sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div class="flex items-center justify-between">
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <Link to="/" >
            <span className="self-center text-xl font-bold sm:text-xl whitespace-nowrap ml-3">
              Trackalack
            </span>
            </Link>
            <div className="flex ml-6 gap-3">
            <Link class="font-semibold text-sm btn btn-sm btn-ghost rounded-full" to="/dashboard" aria-current="page">
                Dashboard
              </Link>
              <Link class="font-semibold text-sm btn btn-sm btn-ghost rounded-full" to="/dashboard" aria-current="page">
                Profile
              </Link>
            </div>              
          </div>
          <div
            id="navbar-collapse-with-animation"
            class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div class="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-2 sm:mt-0 sm:ps-7">
              <SignedOut>
              <SignInButton>
              <button class="font-semibold text-sm btn btn-ghost border border-neutral btn-sm rounded-lg" aria-current="page">
                Login
                </button>
              </SignInButton>
              <SignUpButton>
              <button class="font-semibold text-sm btn btn-secondary border border-neutral btn-sm rounded-lg" aria-current="page">
                Sign Up
                </button>
              </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
