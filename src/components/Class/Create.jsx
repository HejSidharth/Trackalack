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

export function CreateDialog() {
  const [name, setName] = useState("");
  const [classCode, setclassCode] = useState("");
  const user = useUser();
  const userId = user?.user?.id;
  const [location, setLocation] = useState(null);
  const [instructor, setInstructor] = useState(null);

  async function addData() {
    const { data, error } = await supabase.from("class").insert([
      {
        name,
        classCode,
        userId,
        location,
        instructor,
      },
    ]);

    if (error) {
      console.error("Error: ", error);
    } else {
      setName("");
      setclassCode("");
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
        <button className="btn-secondary btn btn-sm rounded-lg">
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
          Add Class
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-neutral bg-base-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex gap-2 items-center">
            Add Class
          </DialogTitle>
          <DialogDescription>{/*Add Description Later*/}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Class Name
            </Label>
            <Input
              id="name"
              className="col-span-3 border-neutral"
              placeholder="Data Structures and Algorithms"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Class Code
            </Label>
            <Input
              id="code"
              placeholder="CS 225"
              className="col-span-3 border-neutral"
              value={classCode}
              onChange={(e) => setclassCode(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Instructor
            </Label>
            <Input
              id="code"
              placeholder="Mr. Hejamadi"
              className="col-span-3 border-neutral"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Location
            </Label>
            <Input
              id="code"
              placeholder="CIF 3039"
              className="col-span-3 border-neutral"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <button className="btn btn-secondary btn-sm rounded-lg" onClick={() => {addData()}}>Add Class</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateDialog;
