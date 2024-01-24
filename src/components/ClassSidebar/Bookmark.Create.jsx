import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { supabase } from "../../supabaseClient";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { set } from "date-fns";
import { useParams } from "react-router-dom";


export function CreateBookmark() {
  const [title, setTitle] = useState("");
  const { intId } = useParams();
  const classId = intId;
  const [url, setUrl] = useState("");
  const user = useUser();
  const userID = user?.user?.id;
  const [location, setLocation] = useState(null);
  const [instructor, setInstructor] = useState(null);

  async function addData() {
    const { data, error } = await supabase.from("bookmark").insert([
      {
        title,
        url,
        userID,
        classId,
      },
    ]);

    if (error) {
      console.error("Error: ", error);
    } else {
      setTitle("");
      setUrl("");
      setLocation("");
      setInstructor("");
      toast.success("Class Added", {
        style: {
          borderRadius: "10px",
          background: "#000000",
          color: "#fff",
        },
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="btn-ghost btn-sm rounded-full">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3"
          >
            <path
              d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-neutral bg-base-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex gap-2 items-center">
            Add Bookmark
          </DialogTitle>
          <DialogDescription>{/*Add Description Later*/}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-left">
              Bookmark Title
            </Label>
            <Input
              id="name"
              className="col-span-3 border-neutral"
              placeholder="Canvas"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username" className="text-left">
              Url
            </Label>
            <Input
              id="code"
              placeholder="https://canvas.com"
              className="col-span-3 border-neutral"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <button
            className="btn btn-secondary btn-sm rounded-lg"
            onClick={() => {
              addData();
            }}
          >
            Add
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateBookmark;
