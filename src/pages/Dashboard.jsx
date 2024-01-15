import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import ThemeToggle from "../components/Theme/ThemeToggle";
import Navbar from "../components/Navbar";
import CountUp from "react-countup";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import DataTableDemo from "/src/components/Table/Tanstack.jsx";
import { supabase } from "../../src/supabaseClient";
import { RedirectToSignUp, SignedIn, SignedOut, useUser } from "@clerk/clerk-react";

export default function Dashboard() {
  const [total, setTotal] = React.useState(0);
  const [statusTotal, setStatusTotal] = React.useState(0);
  const [completeTotal, setCompleteTotal] = React.useState(0);
  const [data, setData] = React.useState([]);
  const user = useUser();
  const userId = user?.user?.id;
  useEffect(() => {
    fetchData();
  }, [userId, total, statusTotal, completeTotal, data]);
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("internship") // replace with your table name
      .select("*")
      .eq("userId", userId);

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      // Format the data
      setData(data);
      console.log("retrieved Successful");
      setTotal(data.length);
      setStatusTotal(data.filter((item) => item.status === "Completed").length);
      setCompleteTotal(
        data.filter((item) => item.outcome === "Accepted").length
      );
    }
  };

  if (!user.user) {
    return (
      <>
      <SignedOut>
        <RedirectToSignUp/>
      </SignedOut>
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-infinity"> </span>
      </div>
      </>
    );
  }
  return (
    <>
    <SignedIn>
      <Navbar />
      <div className="min-h-screen">
        <div className=" flex justify-center px-4 sm:px-0">
          <div className="flex flex-col items-center sm:items-start mt-6">
            <div className="flex justify-between items-center w-full mt-4">
              <h1 className="text-4xl font-bold">Dashboard</h1>
              <Link className="btn-secondary btn btn-sm rounded-lg" to="/add">
                <svg
                  className="w-4 h-4"
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
                    d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Add Application
              </Link>
            </div>
            <div className="sm:flex mt-6 gap-4 sm:flex-row flex-col items-center justify-center hidden">
              <div className="stats shadow border rounded-xl border-neutral w-72 bg-base-200 bg-opacity-50">
                <div className="stat">
                  <div className="flex justify-between items-center">
                    <div className="stat-title">Total Applications</div>
                    <span className="stat-title">
                      <svg
                        width="15"
                        className="w-4 h-4"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <div className="stat-value">
                    <CountUp start={0} end={total} duration={4} />
                  </div>
                </div>
              </div>
              <div className="stats shadow border rounded-xl border-neutral w-72 bg-base-200 bg-opacity-50">
                <div className="stat">
                  <div className="flex justify-between items-center">
                    <div className="stat-title">Application Sent</div>
                    <span className="stat-title">
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="stat-value">
                    <CountUp start={0} end={statusTotal} duration={4} />
                  </div>
                </div>
              </div>
              <div className="stats shadow border rounded-xl border-neutral w-72 bg-base-200 bg-opacity-50">
                <div className="stat">
                  <div className="flex justify-between items-center">
                    <div className="stat-title">Successful Applications</div>
                    <span className="stat-title">
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="stat-value">
                    <CountUp start={0} end={completeTotal} duration={4} />
                  </div>
                </div>
              </div>
            </div>
            <DataTableDemo />
          </div>
        </div>
      </div>
      </SignedIn>
    </>
  );
}
