import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import ThemeToggle from "../components/Theme/ThemeToggle";
import Navbar from "../components/Navbar";
import CountUp from "react-countup";
import Table from "../components/Table";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="h-screen">
      <div class=" flex justify-center">
        <div className="flex flex-col items-start mt-6">
          <div className="flex justify-between items-center w-full mt-4">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <Link className="btn-secondary btn btn-sm rounded-lg" to='/add'>
              <svg
                class="w-4 h-4"
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
                  d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Add Application
            </Link>
          </div>
          <div className="flex mt-6 gap-4 sm:flex-row flex-col items-center justify-center">
            <div className="stats shadow border rounded-xl border-neutral w-72">
              <div className="stat">
                <div className="flex justify-between items-center">
                  <div className="stat-title">Total Applications</div>
                  <span className="stat-title">
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 1v4a1 1 0 0 1-1 1H1m4 10v-2m3 2v-6m3 6v-4m4-10v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                      />
                    </svg>
                  </span>
                </div>
                <div className="stat-value">
                  <CountUp start={0} end={27} duration={4} />
                </div>
              </div>
            </div>
            <div className="stats shadow border rounded-xl border-neutral w-72">
              <div className="stat">
                <div className="flex justify-between items-center">
                  <div className="stat-title">Total Applications</div>
                  <span className="stat-title">
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 1v4a1 1 0 0 1-1 1H1m4 10v-2m3 2v-6m3 6v-4m4-10v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                      />
                    </svg>
                  </span>
                </div>
                <div className="stat-value">
                  <CountUp start={0} end={13} duration={4} />
                </div>
              </div>
            </div>
            <div className="stats shadow border rounded-xl border-neutral w-72">
              <div className="stat">
                <div className="flex justify-between items-center">
                  <div className="stat-title">Total Applications</div>
                  <span className="stat-title">
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 1v4a1 1 0 0 1-1 1H1m4 10v-2m3 2v-6m3 6v-4m4-10v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
                      />
                    </svg>
                  </span>
                </div>
                <div className="stat-value">
                  <CountUp start={0} end={3} duration={4} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
