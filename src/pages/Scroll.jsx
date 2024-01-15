import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { motion, useScroll } from "framer-motion";
import Footer from "../components/Footer";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "../supabaseClient";
import { ToastIcon, toast } from "react-hot-toast";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import DateTimePicker from "react-datetime-picker";
import { data } from "autoprefixer";
import { useNavigate } from "react-router-dom";

export default function Scroll() {
  const session = useSession(); //Tokens
  const { isLoading } = useSessionContext(); //Loading
  const supa = useSupabaseClient(); //Supabase Client
  const [scrollY, setScrollY] = useState(0);
  function getScrollPercent() {
    var h = document.documentElement,
      b = document.body,
      st = "scrollTop",
      sh = "scrollHeight";
    let percent =
      ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
    setScrollY(Math.round(percent));
  }

  useEffect(() => {
    const onScroll = () => {
      getScrollPercent();
    };

    window.addEventListener("scroll", onScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const user = useUser();
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [appDate, setAppDate] = useState("2024-04-01");
  const [url, setUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [contact, setContact] = useState("");
  const [intDate, setIntDate] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [status, setStatus] = useState("Completed");
  const [outcome, setOutcome] = useState("N/A");
  const [priority, setPriority] = useState("Low")
  const [notes, setNotes] = useState("");
  const userId = user?.user?.id;
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  const handleStartChange = (event) => {
    const dateTime = new Date(event.target.value);
    setStart(dateTime.toISOString());
  };

  const handleEndChange = (event) => {
    const dateTime = new Date(event.target.value);
    setEnd(dateTime.toISOString());
  };

  async function createCalendarEvent() {
    const event = {
      summary: eventName,
      description: eventDetails,
      location: eventLocation,
      start: {
        dateTime: start,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    const createEventPromise = fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.provider_token}`,
        },
        body: JSON.stringify(event),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setStart("");
        setEnd("");
        setEventName("");
        setEventDetails("");
      });

    toast.promise(createEventPromise, {
      loading: "Creating event...",
      success: <b>Event created!</b>,
      error: <b>Could not create event.</b>,
      style: {
        background: "#000000",
        color: "#fff",
      },
    });
  }
  const navigate = useNavigate();

  async function addData() {
    const { data, error } = await supabase.from("internship").insert([
      {
        userId,
        companyName,
        role,
        location,
        appDate,
        url,
        jobDescription,
        contact,
        intDate,
        followUp,
        status,
        outcome,
        notes,
        priority,
      },
    ]);

    if (error) {
      console.error("Error: ", error);
    } else {
      setCompanyName("");
      setRole("");
      setLocation("");
      setAppDate("2024-04-01");
      setUrl("");
      setJobDescription("");
      setContact("");
      setIntDate("");
      setFollowUp("");
      setStatus("Completed");
      setOutcome("N/A");
      setPriority("Low")
      setNotes("");
      toast.success("Internship Added!", {
        style: {
          borderRadius: "10px",
          background: "#000000",
          color: "#fff",
        },
      });
      navigate('/dashboard'); // Redirect to the dashboard
    }
  }

  async function googleSignIn() {
    const { error } = await supa.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
        redirectTo: window.location.href,
      },
    });
    if (error) {
      console.log(error.message);
    }
  }

  async function signOutNow() {
    const { error } = await supa.auth.signOut();
    if (error) {
      console.log(error.message);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-infinity loading-md"></span>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <motion.div
        className="progress-bar mt-12"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="">
        <div className="h-16 flex items-center pl-12"></div>
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3 }}
        >
          <Sidebar />
        </motion.div>
        <div className="p-4 sm:ml-64">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 3 }}
            >
              <h1 className="text-3xl font-bold sm:text-start text-center">
                Add an Internship
              </h1>
              <p className="text-sm text-gray-300 sm:text-start text-center">
                Enter all the relavent fields
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 3 }}
            >
              <div
                id="app"
                className="mt-4 bg-base-200 rounded-lg border border-neutral p-6 bg-opacity-80"
              >
                <h1 className="text-2xl font-bold">Application Details</h1>
                <p className="text-sm text-gray-300">
                  Please enter relevant information about the company
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-6">
                  <div>
                    <label
                      for="hs-firstname-hire-us-2"
                      className="block mb-2 text-sm font-medium"
                    >
                      Company name
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Inc"
                      name="hs-firstname-hire-us-2"
                      id="hs-firstname-hire-us-2"
                      className="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      for="hs-lastname-hire-us-2"
                      className="block mb-2 text-sm font-medium"
                    >
                      Role
                    </label>
                    <input
                      type="text"
                      placeholder="Fullstack Developer"
                      name="hs-lastname-hire-us-2"
                      id="hs-lastname-hire-us-2"
                      className="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-3">
                  <div>
                    <label
                      for="hs-company-hire-us-2"
                      className="block mb-2 text-sm font-medium"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Chicago, IL"
                      name="hs-company-hire-us-2"
                      id="hs-company-hire-us-2"
                      className="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      for="hs-company-website-hire-us-2"
                      className="block mb-2 text-sm font-medium"
                    >
                      Application Date
                    </label>
                    <input
                      type="date"
                      name="hs-company-website-hire-us-2"
                      id="hs-company-website-hire-us-2"
                      className="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none"
                      onChange={(e) => setAppDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label
                    for="hs-work-email-hire-us-2"
                    className="block mb-2 text-sm font-medium"
                  >
                    Application Portal/Website
                  </label>
                  <input
                    type="url"
                    placeholder="https://acme.com"
                    name="hs-work-email-hire-us-2"
                    id="hs-work-email-hire-us-2"
                    autocomplete="url"
                    className="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <label
                    for="hs-about-hire-us-2"
                    className="block mb-2 text-sm font-medium"
                  >
                    Job Description
                  </label>
                  <textarea
                    id="hs-about-hire-us-2"
                    name="hs-about-hire-us-2"
                    rows="4"
                    className="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none resize-none"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </motion.div>
            <div
              id="comm"
              className="mt-10 bg-base-200 rounded-lg border border-neutral p-6 bg-opacity-80"
            >
              <h1 className="text-2xl font-bold">Communication & Follow-Up</h1>
              <p className="text-sm text-gray-300">
                Please enter relevant information about the company
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-6">
                <div>
                  <label
                    for="hs-firstname-hire-us-2"
                    className="block mb-2 text-sm font-medium"
                  >
                    Contact Information
                  </label>
                  <input
                    type="text"
                    placeholder="johndoe@gmail.com"
                    name="hs-firstname-hire-us-2"
                    id="hs-firstname-hire-us-2"
                    className="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    for="hs-company-website-hire-us-2"
                    className="block mb-2 text-sm font-medium"
                  >
                    Interview Date
                  </label>
                  <input
                    type="date"
                    name="hs-company-website-hire-us-2"
                    id="hs-company-website-hire-us-2"
                    className="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none"
                    onChange={(e) => setIntDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-3">
                <label
                  for="hs-work-email-hire-us-2"
                  className="block mb-2 text-sm font-medium"
                >
                  Follow-Up Actions
                </label>
                <textarea
                  id="hs-about-hire-us-2"
                  name="hs-about-hire-us-2"
                  rows="4"
                  className="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none resize-none"
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div
              id="stat"
              className="mt-10 bg-base-200 rounded-lg border border-neutral p-6 bg-opacity-80"
            >
              <h1 className="text-2xl font-bold">Status & Outcomes</h1>
              <p className="text-sm text-gray-300">
                Please enter relevant information about the company
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-6">
                <div>
                  <label
                    for="hs-firstname-hire-us-2"
                    className="block mb-2 text-sm font-medium"
                  >
                    Status of Applications
                  </label>
                  <details className="dropdown w-full dropdown-hover">
                    <summary className="btn bg-transparent border border-neutral outline-none py-3 px-4 block w-full rounded-lg text-sm text-start">
                      <div className="flex justify-between items-center">
                        {status}
                        <svg
                          className="w-3 h-3 "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 8"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                          />
                        </svg>{" "}
                      </div>{" "}
                    </summary>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 bg-opacity-100 w-full rounded-lg"
                    >
                      <li>
                        <a
                          onClick={() => {
                            setStatus("Completed");
                          }}
                        >
                          Completed
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            setStatus("Not Completed");
                          }}
                        >
                          Not Completed
                        </a>
                      </li>
                    </ul>
                  </details>
                </div>
                <div>
                  <label
                    for="hs-firstname-hire-us-2"
                    className="block mb-2 text-sm font-medium"
                  >
                    Outcome of Application
                  </label>
                  <details className="dropdown w-full">
                    <summary className="btn bg-transparent border border-neutral outline-none py-3 px-4 block w-full rounded-lg text-sm text-start">
                      <div className="flex justify-between items-center">
                        {outcome}
                        <svg
                          className="w-3 h-3 "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 8"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                          />
                        </svg>{" "}
                      </div>{" "}
                    </summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 bg-opacity-100 rounded-lg w-full">
                    <li>
                        <a
                          onClick={() => {
                            setOutcome("N/A");
                          }}
                        >
                          N/A
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            setOutcome("Accepted");
                          }}
                        >
                          Accepted
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            setOutcome("Rejected");
                          }}
                        >
                          Rejected
                        </a>
                      </li>
                    </ul>
                  </details>
                </div>
              </div>
              <div className="mt-3">
                  <label
                    for="hs-firstname-hire-us-2"
                    className="block mb-2 text-sm font-medium"
                  >
                    Priority
                  </label>
                  <details className="dropdown w-full">
                    <summary className="btn bg-transparent border border-neutral outline-none py-3 px-4 block w-full rounded-lg text-sm text-start">
                      <div className="flex justify-between items-center">
                        {priority}
                        <svg
                          className="w-3 h-3 "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 8"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                          />
                        </svg>{" "}
                      </div>{" "}
                    </summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 bg-opacity-100 rounded-lg w-full">
                    <li>
                        <a
                          onClick={() => {
                            setPriority("Low");
                          }}
                        >
                          Low
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            setPriority("Medium");
                          }}
                        >
                          Medium
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            setPriority("High");
                          }}
                        >
                          High
                        </a>
                      </li>
                    </ul>
                  </details>
                </div>
              <div className="mt-3">
                <label
                  for="hs-work-email-hire-us-2"
                  className="block mb-2 text-sm font-medium"
                >
                  Notes/Comments
                </label>
                <textarea
                  id="hs-about-hire-us-2"
                  name="hs-about-hire-us-2"
                  rows="4"
                  className="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none resize-none"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div
              id="rem"
              className="mt-10 bg-base-200 rounded-lg border border-neutral p-6 bg-opacity-80 hidden"
            >
              {session ? (
                <>
                  <h1 className="flex justify-between items-center text-2xl font-bold">
                    Reminders
                    <button
                      className="btn btn-ghost btn-circle"
                      onClick={() => {
                        signOutNow();
                      }}
                    >
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                        />
                      </svg>
                    </button>
                  </h1>{" "}
                  <p className="text-sm text-gray-300">
                    Add Google Calendar Events to keep track of your application process! 
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-6">
                    <div>
                      <label
                        for="hs-firstname-hire-us-2"
                        className="block mb-2 text-sm font-medium"
                      >
                        Event Name
                      </label>
                      <input
                        type="text"
                        placeholder="johndoe@gmail.com"
                        name="hs-firstname-hire-us-2"
                        id="hs-firstname-hire-us-2"
                        className="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label
                        for="hs-company-website-hire-us-2"
                        className="block mb-2 text-sm font-medium"
                      >
                        Event Location
                      </label>
                      <input
                        type="text"
                        placeholder="johndoe@gmail.com"
                        name="hs-firstname-hire-us-2"
                        id="hs-firstname-hire-us-2"
                        className="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label
                      for="hs-work-email-hire-us-2"
                      className="block mb-2 text-sm font-medium"
                    >
                      Event Details
                    </label>
                    <textarea
                      id="hs-about-hire-us-2"
                      name="hs-about-hire-us-2"
                      rows="2"
                      className="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none resize-none"
                      value={eventDetails}
                      onChange={(e) => setEventDetails(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-3">
                    <div>
                      <label
                        for="hs-firstname-hire-us-2"
                        className="block mb-2 text-sm font-medium"
                      >
                        Event Start Time
                      </label>
                      <input
                        type="datetime-local"
                        name="hs-company-website-hire-us-2"
                        id="hs-company-website-hire-us-2"
                        className="mt-2 py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none"
                        onChange={handleStartChange}
                      />
                    </div>

                    <div>
                      <label
                        for="hs-firstname-hire-us-2"
                        className="block mb-2 text-sm font-medium"
                      >
                        Event End Time
                      </label>
                      <input
                        type="datetime-local"
                        name="hs-company-website-hire-us-2"
                        id="hs-company-website-hire-us-2"
                        className="mt-2 py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none"
                        onChange={handleEndChange}
                      />
                    </div>
                  </div>
                  <div className="flex w-full justify-between mt-6">
                    <div>{/*For space reasons!*/}</div>
                    <button
                      className="btn-secondary btn btn-sm rounded-lg"
                      onClick={() => {
                        createCalendarEvent();
                      }}
                    >
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
                      Add Reminder
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="flex justify-between items-center text-2xl font-bold">
                    Reminders
                    <button
                      className="btn btn-ghost btn-circle"
                      onClick={() => {
                        googleSignIn();
                      }}
                    >
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 19"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                          clipRule="evenodd"
                        />
                      </svg>{" "}
                    </button>
                  </h1>{" "}
                  <p className="text-sm text-gray-300">
                    Please sign in to add reminders
                  </p>
                </>
              )}
            </div>
            <div
              id="sub"
              className="mt-10 bg-base-200 rounded-lg border border-neutral bg-opacity-80"
            >
              <div className="p-6">
                <h1 className="text-2xl font-bold">Submit</h1>
              </div>

              <div className="flex w-full border-t border-neutral p-4 justify-between">
                <div className="code">
                  Check your information before you save!
                </div>
                <button
                  onClick={addData}
                  className="btn-secondary btn btn-sm rounded-lg"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="h-32">{/*Box*/}</div>
        </div>
      </div>
    </>
  );
}
