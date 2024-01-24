import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient"; // replace with your Supabase client import
import { useParams } from "react-router-dom";
import CreateBookmark from "./Bookmark.Create";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { AlertDialogDemo } from "../Table/DeleteAlert";
import BookmarkDelete from "./Bookmark.Delete";
import { deleteBookmark } from "./BookmarkDelete";
import LocalTime from "./Sidebar.Time";
import { Checkbox } from "../ui/checkbox";
import { CreateTodos } from "./Todos.Create";
import { deleteTodos } from "./TodosDelete";


export default function BookmarkSidebar() {
  const [bookmarks, setBookmarks] = useState([]);
  const [toto, setToto] = useState([]);
  const { intId } = useParams();

  
  
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

  const toggleTask = async (taskId, value) => {
  
    const { error: updateError } = await supabase
      .from('task')
      .update({ complete: !value })
      .eq('taskId', taskId)
      .single();
  
    if (updateError) {
      console.error('Error updating task:', updateError);
      // Revert the UI change if there's an error
      setToto(prevToto => 
        prevToto.map(task => 
          task.taskId === taskId ? { ...task, complete: value } : task
        )
      );
    }
  };

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("task")
      .select("*")
      .eq("classId", intId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching bookmarks:", error);
    } else {
      setToto(data);
    }
  };

  useEffect(() => {
    fetchBookmarks();
    // Remove bookmarks from dependency array to avoid infinite loop
  }, [intId, bookmarks]); 
  
  useEffect(() => {
    fetchTodos();
    // Remove toto from dependency array to avoid infinite loop
  }, [intId, toto]);

  const deleteTask = async (taskId) => {
    // Optimistically update the UI
    setToto(prevToto => prevToto.filter(task => task.taskId !== taskId));
  
    const { error: deleteError } = await supabase
      .from('task')
      .delete()
      .eq('taskId', taskId);
  
    if (deleteError) {
      console.error('Error deleting task:', deleteError);
      // Fetch the latest tasks to revert the UI
      fetchTasks();
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
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed left-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0 rounded-lg bg-base-200 bg-opacity-35 h-screen flex flex-col py-16 mt-1"
        aria-label="Sidebar"
      >
        <div className="border-b border-neutral m-3 px-3 pb-1 flex justify-between">
          <h1 className="text-lg font-bold">Quick Links</h1>
          <CreateBookmark />
        </div>
        <div className="px-3 pb-4">
          <ul className="space-y-2 font-medium">
            {bookmarks.map((bookmark, index) => (
              <li key={index}>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between btn btn-ghost w-full rounded-lg font-bold btn-sm"
                >
                  <div className="flex gap-2">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-blue-300"
                    >
                      <path
                        d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                      <path
                        d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                      <path
                        d="M7.09991 13.5V1.5H7.89991V13.5H7.09991zM10.375 7.49998C10.375 5.32724 9.59364 3.17778 8.06183 1.75656L8.53793 1.24341C10.2396 2.82218 11.075 5.17273 11.075 7.49998 11.075 9.82724 10.2396 12.1778 8.53793 13.7566L8.06183 13.2434C9.59364 11.8222 10.375 9.67273 10.375 7.49998zM3.99969 7.5C3.99969 5.17611 4.80786 2.82678 6.45768 1.24719L6.94177 1.75281C5.4582 3.17323 4.69969 5.32389 4.69969 7.5 4.6997 9.67611 5.45822 11.8268 6.94179 13.2472L6.45769 13.7528C4.80788 12.1732 3.9997 9.8239 3.99969 7.5z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                      <path
                        d="M7.49996 3.95801C9.66928 3.95801 11.8753 4.35915 13.3706 5.19448 13.5394 5.28875 13.5998 5.50197 13.5055 5.67073 13.4113 5.83948 13.198 5.89987 13.0293 5.8056 11.6794 5.05155 9.60799 4.65801 7.49996 4.65801 5.39192 4.65801 3.32052 5.05155 1.97064 5.8056 1.80188 5.89987 1.58866 5.83948 1.49439 5.67073 1.40013 5.50197 1.46051 5.28875 1.62927 5.19448 3.12466 4.35915 5.33063 3.95801 7.49996 3.95801zM7.49996 10.85C9.66928 10.85 11.8753 10.4488 13.3706 9.6135 13.5394 9.51924 13.5998 9.30601 13.5055 9.13726 13.4113 8.9685 13.198 8.90812 13.0293 9.00238 11.6794 9.75643 9.60799 10.15 7.49996 10.15 5.39192 10.15 3.32052 9.75643 1.97064 9.00239 1.80188 8.90812 1.58866 8.9685 1.49439 9.13726 1.40013 9.30601 1.46051 9.51924 1.62927 9.6135 3.12466 10.4488 5.33063 10.85 7.49996 10.85z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>{" "}
                    {bookmark.title}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <DotsHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>

                      <DropdownMenuSeparator />
                      <Button
                        className="p-1 hover:bg-base-200 w-full flex justify-start rounded-none px-2"
                        onClick={() => {
                          deleteBookmark(bookmark.bookmarkId);
                        }}
                      >
                        Delete
                      </Button>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-b border-neutral m-3 px-3 pb-1 flex justify-between">
          <h1 className="text-lg font-bold">Todos</h1>
          <CreateTodos />
        </div>
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
          {toto.length > 0 ? (

            toto.map((todomon, index) => (
              <li key={index}>
                <a
                  rel="noopener noreferrer"
                  className="flex justify-between btn btn-ghost w-full rounded-lg font-bold btn-sm"
                  onClick={() => {toggleTask(todomon.taskId, todomon.complete)}}
                >
                  <div className="flex gap-2">
                    {todomon.complete ? (
                      <div className="capitalize flex gap-1 items-center text-green-300 cursor-pointer">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>{" "}
                        <span className="font-semibold">{todomon.todo}</span>
                      </div>
                    ) : (
                      <div className="capitalize flex gap-1 items-center text-red-300 cursor-pointer">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span className="font-semibold">{todomon.todo}</span>
                      </div>
                    )}{" "}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <DotsHorizontalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>

                      <DropdownMenuSeparator />
                      <Button
                        className="p-1 hover:bg-base-200 w-full flex justify-start rounded-none px-2"
                        onClick={() => {
                          deleteTask(todomon.taskId);
                        }}
                      >
                        Delete
                      </Button>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </a>
              </li>
            ))
            ) : (
              <p className="text-center text-sm">No todos available</p>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
}
