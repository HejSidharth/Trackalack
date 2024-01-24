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
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "../../lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

export function CreateAssignment() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Not Completed");
  const [priority, setPriority] = useState("Low");
  const [date, setDate] = useState("2024-04-01");
  const [complete, setComplete] = useState(false);
  const { intId } = useParams();
  const classId = intId;
  const user = useUser();
  const userId = user?.user?.id;
  const [url, setUrl] = useState("");
  async function addData() {
    const { data, error } = await supabase.from("assignment").insert([
      {
        name,
        status,
        priority,
        date,
        classId,
        userId,
        url,
      },
    ]);

    if (error) {
      console.error("Error: ", error);
    } else {
      toast.success("Class Added", {
        style: {
          borderRadius: "10px",
          background: "#000000",
          color: "#fff",
        },
      });
    }
  }
  const handleDateChange = (newDate) => {
    // Update state variable
    setDate(newDate);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="btn border border-neutral bg-base-200 bg-opacity-50 btn-sm rounded-lg flex gap-2 items-center ml-2">
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
          <p>Add Assignment</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-neutral bg-base-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex gap-2 items-center">
            Add Assignment
          </DialogTitle>
          <DialogDescription>{/*Add Description Later*/}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-left">
              Assignment Title
            </Label>
            <Input
              id="name"
              className="col-span-3 border-neutral"
              placeholder="Do Paper 1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-left">
              Assignment Url
            </Label>
            <Input
              id="name"
              className="col-span-3 border-neutral"
              placeholder="https://canvas.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-left">
              Assignment Deadline
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className="border-neutral flex justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-0">
                <Calendar
                  mode="single"
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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

export default CreateAssignment;
