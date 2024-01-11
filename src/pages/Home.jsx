import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { fetchNotes } from "../utlils/Notes/fetchUtil";
import { deleteNote } from "../utlils/Notes/deleteUtil";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 text-center min-h-screen">
        <section className="pt-24">
          <div className="px-12 mx-auto max-w-7xl">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
                <p className="code rounded-full font-mono">Version 1.0</p>
                <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal md:text-6xl md:tracking-tight">
                  <span className="text">Start</span>{" "}
                  <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
                    sparking excitement
                  </span>{" "}
                  <span className="text">for your internship journey!</span>
                </h1>
                <p className="px-0 mb-8 text-lg md:text-xl lg:px-24">
                  Accelerate your career path with our dynamic internship
                  tracking app - your key to enhanced productivity and success!
                </p>
              </div>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="mt-12 flex flex-col justify-center gap-y-5 sm:mt-10 sm:flex-row sm:gap-y-0 sm:gap-x-6">
                <Link
                  className="group inline-flex items-center justify-center rounded-lg py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 animate-fade-in-left btn btn-ghost"
                  to="/dashboard"
                >
                  <svg
                    className="w-3 h-3 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13V1m0 0L1 5m4-4 4 4"
                    />
                  </svg>
                  <span className="ml-3">Get Started</span>
                </Link>
                <Link
                  className="group inline-flex items-center justify-center rounded-lg py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 animate-fade-in-left btn btn-ghost"
                  to="/dashboard"
                >
                  <svg
                    className="w-3 h-3"
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
                  <span className="ml-3">Explore Features</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
