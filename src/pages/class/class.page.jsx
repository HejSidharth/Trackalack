import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient"; // replace with your Supabase client import
import Navbar from "../../components/Navbar";
import CreateBookmark from "../../components/ClassSidebar/Bookmark.Create";
import { motion, useScroll } from "framer-motion";
import Sidebar from "../../components/Sidebar/Sidebar";
import BookmarkSidebar from "../../components/ClassSidebar/Bookmark.Sidebar";
import DataTableDemo from "../../components/Table/Tanstack";
import AssignmentTable from "../../components/Class/Assignment.Table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

function ClassDetails() {
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();

  const { intId } = useParams();
  const [internship, setInternship] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from("bookmark")
      .select("*")
      .eq("classId", intId);

    if (error) {
      console.error("Error fetching bookmarks:", error);
    } else {
      setBookmarks(data);
    }
  };

  function Favicon({ url }) {
    // Extract the domain from the URL
    const domain = new URL(url).hostname;

    return (
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=${16}`}
        alt="favicon"
      />
    );
  }
  useEffect(() => {
    fetchBookmarks();
  }, [internship, bookmarks, intId]);

  useEffect(() => {
    const fetchInternship = async () => {
      const { data, error } = await supabase
        .from("class")
        .select("*")
        .eq("classId", intId)
        .single();

      if (error) {
        console.error("Error fetching internship:", error);
      } else {
        setInternship(data);
      }
    };

    fetchInternship();
  }, [intId]);

  if (!internship) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-infinity">{/* The Loader */}</span>
      </div>
    );
  }

  return (
    <>
      <div className="">
        <div className="min-h-screen">
        <Navbar />
          <motion.div>
            <BookmarkSidebar />
          </motion.div>
          <div className="p-4 sm:ml-64 py-16">
            <div>
              <motion.div>
                <p className="text-sm text-gray-300 sm:text-start text-center font-bold">
                  {internship.classCode}
                </p>
                <h1 className="text-3xl font-bold sm:text-start text-center">
                  {internship.name}
                </h1>
              </motion.div>
              <motion.div>
                <div
                  id="app"
                  className="mt-4 bg-base-200 rounded-lg border border-neutral p-6 bg-opacity-80 hidden"
                >
                  <h1 className="text-2xl font-bold">
                    Shit imma put later Anissh
                  </h1>
                  <p className="text-sm text-gray-300">Hey Baby Grl hehe</p>
                </div>
                <Tabs defaultValue="assignment" className="mt-5">
                  <TabsList>
                    <TabsTrigger value="assignment">Assignments</TabsTrigger>
                    <TabsTrigger value="exams">Exams</TabsTrigger>
                  </TabsList>
                  <TabsContent value="assignment">
                    <AssignmentTable/>
                  </TabsContent>
                  <TabsContent value="exams">
                    <AssignmentTable/>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClassDetails;
