import * as React from "react";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import moment from "moment";
import SheetSide from "../Table/Sheet";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../ui/command";

import {
  CalendarIcon,
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { DayPicker } from "react-day-picker";
import { AlertDialogDemo } from "./DeleteAlert";
import { RadioGroupItem, RadioGroup } from "../ui/radio-group";
import { Label } from "../ui/label";

export const deleteNote = async (id) => {
  if (!id) {
    console.log("Note ID is not defined");
    return;
  }

  const { error } = await supabase
    .from("internship") // replace with your table name
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting note:", error);
    toast.error(`${error.message}`, {
      style: {
        background: "#000000",
        color: "#fff",
      },
    });
  } else {
    console.log("Note deleted successfully");
    toast.success("Note Deleted Successfully!", {
      style: {
        background: "#000000",
        color: "#fff",
      },
    });
    // You might want to fetch the data again here to update the UI
  }
};

export const columns = [
  {
    accessorKey: "companyName",
    header: ({ column }) => {
      return (
        <div className="capitalize flex items-center gap-2 font-bold w-max">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.28856 0.796908C7.42258 0.734364 7.57742 0.734364 7.71144 0.796908L13.7114 3.59691C13.8875 3.67906 14 3.85574 14 4.05V10.95C14 11.1443 13.8875 11.3209 13.7114 11.4031L7.71144 14.2031C7.57742 14.2656 7.42258 14.2656 7.28856 14.2031L1.28856 11.4031C1.11252 11.3209 1 11.1443 1 10.95V4.05C1 3.85574 1.11252 3.67906 1.28856 3.59691L7.28856 0.796908ZM2 4.80578L7 6.93078V12.9649L2 10.6316V4.80578ZM8 12.9649L13 10.6316V4.80578L8 6.93078V12.9649ZM7.5 6.05672L12.2719 4.02866L7.5 1.80176L2.72809 4.02866L7.5 6.05672Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          {"Organization"}
        </div>
      );
    },
    cell: ({ row }) => {
      const val = row.original.intId;
      return (
        <div className="capitalize flex items-center gap-2 font-semibold w-max hover:text-purple-300 cursor-pointer">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.28856 0.796908C7.42258 0.734364 7.57742 0.734364 7.71144 0.796908L13.7114 3.59691C13.8875 3.67906 14 3.85574 14 4.05V10.95C14 11.1443 13.8875 11.3209 13.7114 11.4031L7.71144 14.2031C7.57742 14.2656 7.42258 14.2656 7.28856 14.2031L1.28856 11.4031C1.11252 11.3209 1 11.1443 1 10.95V4.05C1 3.85574 1.11252 3.67906 1.28856 3.59691L7.28856 0.796908ZM2 4.80578L7 6.93078V12.9649L2 10.6316V4.80578ZM8 12.9649L13 10.6316V4.80578L8 6.93078V12.9649ZM7.5 6.05672L12.2719 4.02866L7.5 1.80176L2.72809 4.02866L7.5 6.05672Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <Link to={`/internship/${val}`}>{row.getValue("companyName")}</Link>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ table }) => {
      return (
        <div className="capitalize flex gap-1 items-center">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="font-bold">Status</span>
        </div>
      );
    },
    cell: ({ row }) => {
      const toggleStatus = async () => {
        const newStatus =
          row.getValue("status") === "Not Completed"
            ? "Completed"
            : "Not Completed";

        const { error } = await supabase
          .from("internship") // replace with your table name
          .update({ status: newStatus })
          .eq("id", row.original.id); // replace 'id' with your actual id column name

        if (error) {
          console.error("Error updating status:", error);
          toast.error(`${error.message}`, {
            style: {
              background: "#000000",
              color: "#fff",
            },
          });
        } else {
          toast.success(`Status is ${newStatus}`, {
            style: {
              background: "#000000",
              color: "#fff",
            },
          });
        }
      };

      if (row.getValue("status") === "Not Completed") {
        return (
          <div
            className="capitalize flex gap-1 items-center hover:text-red-300 cursor-pointer"
            onClick={toggleStatus}
          >
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
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="font-semibold">Not Completed</span>{" "}
          </div>
        );
      } else {
        return (
          <div
            className="capitalize flex gap-1 items-center hover:text-green-300 cursor-pointer"
            onClick={toggleStatus}
          >
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
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="font-semibold">Completed</span>{" "}
          </div>
        );
      }
    },
  },
  {
    accessorKey: "appDate",
    header: ({ column }) => {
      return (
        <div className="capitalize flex items-center gap-2 font-bold w-max ">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>{" "}
          {"Application Deadline"}
        </div>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("appDate"));
      const isLessThanAWeek = Math.abs(moment().diff(date, "days")) <= 1;
      const dateclassName = isLessThanAWeek
        ? "justify-start text-left border-0 p-0 font-semibold hover:text-red-400 text-red-300"
        : "justify-start text-left border-0 p-0 font-semibold hover:text-yellow-200";
      const handleDateChange = async (newDate) => {
        const { error } = await supabase
          .from("internship") // replace with your table name
          .update({ appDate: newDate })
          .eq("id", row.original.id); // replace 'id' with your actual id column name

        if (error) {
          console.error("Error updating date:", error);
        } else {
          toast.success(`Date is set to ${format(newDate, "PPP")}`, {
            style: {
              background: "#000000",
              color: "#fff",
            },
          });
        }
      };

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"outline"} className={cn(dateclassName)}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );
    },
  },

  {
    accessorKey: "outcome",
    header: ({ table }) => {
      return (
        <div className="capitalize flex gap-1 items-center">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="font-bold">Outcome</span>
        </div>
      );
    },
    cell: ({ row }) => {
      const toggleOutcome = async () => {
        let newOutcome;
        switch (row.getValue("outcome")) {
          case "N/A":
            newOutcome = "Rejected";
            break;
          case "Rejected":
            newOutcome = "Accepted";
            break;
          case "Accepted":
            newOutcome = "N/A";
            break;
          default:
            newOutcome = "N/A";
            break;
        }

        const { error } = await supabase
          .from("internship") // replace with your table name
          .update({ outcome: newOutcome })
          .eq("id", row.original.id); // replace 'id' with your actual id column name

        if (error) {
          console.error("Error updating outcome:", error);
          toast.error(`${error.message}`, {
            style: {
              background: "#000000",
              color: "#fff",
            },
          });
        } else {
          toast.success(`Outcome is ${newOutcome}`, {
            style: {
              background: "#000000",
              color: "#fff",
            },
          });
        }
      };
      if (row.getValue("outcome") === "N/A") {
        return (
          <div
            className="capitalize flex gap-1 items-center hover:text-blue-300 cursor-pointer"
            onClick={toggleOutcome}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.49991 0.877075C3.84222 0.877075 0.877075 3.84222 0.877075 7.49991C0.877075 11.1576 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1576 14.1227 7.49991C14.1227 3.84222 11.1576 0.877075 7.49991 0.877075ZM3.85768 3.15057C4.84311 2.32448 6.11342 1.82708 7.49991 1.82708C10.6329 1.82708 13.1727 4.36689 13.1727 7.49991C13.1727 8.88638 12.6753 10.1567 11.8492 11.1421L3.85768 3.15057ZM3.15057 3.85768C2.32448 4.84311 1.82708 6.11342 1.82708 7.49991C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C8.88638 13.1727 10.1567 12.6753 11.1421 11.8492L3.15057 3.85768Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="font-semibold">N/A</span>
          </div>
        );
      } else if (row.getValue("outcome") === "Rejected") {
        return (
          <div
            className="capitalize flex gap-1 items-center hover:text-red-300 cursor-pointer"
            onClick={toggleOutcome}
          >
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
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="font-semibold">Rejected</span>
          </div>
        );
      } else {
        return (
          <div
            className="capitalize flex gap-1 items-center hover:text-green-300 cursor-pointer"
            onClick={toggleOutcome}
          >
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
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="font-semibold">Accepted</span>
          </div>
        );
      }
    },
  },
  {
    accessorKey: "priority",
    header: ({ table }) => {
      return (
        <div className="capitalize flex gap-1 items-center">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.900024 7.50002C0.900024 3.85495 3.85495 0.900024 7.50002 0.900024C11.1451 0.900024 14.1 3.85495 14.1 7.50002C14.1 11.1451 11.1451 14.1 7.50002 14.1C3.85495 14.1 0.900024 11.1451 0.900024 7.50002ZM7.50002 1.80002C4.35201 1.80002 1.80002 4.35201 1.80002 7.50002C1.80002 10.648 4.35201 13.2 7.50002 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.35201 10.648 1.80002 7.50002 1.80002ZM3.07504 7.50002C3.07504 5.05617 5.05618 3.07502 7.50004 3.07502C9.94388 3.07502 11.925 5.05617 11.925 7.50002C11.925 9.94386 9.94388 11.925 7.50004 11.925C5.05618 11.925 3.07504 9.94386 3.07504 7.50002ZM7.50004 3.92502C5.52562 3.92502 3.92504 5.52561 3.92504 7.50002C3.92504 9.47442 5.52563 11.075 7.50004 11.075C9.47444 11.075 11.075 9.47442 11.075 7.50002C11.075 5.52561 9.47444 3.92502 7.50004 3.92502ZM7.50004 5.25002C6.2574 5.25002 5.25004 6.25739 5.25004 7.50002C5.25004 8.74266 6.2574 9.75002 7.50004 9.75002C8.74267 9.75002 9.75004 8.74266 9.75004 7.50002C9.75004 6.25738 8.74267 5.25002 7.50004 5.25002ZM6.05004 7.50002C6.05004 6.69921 6.69923 6.05002 7.50004 6.05002C8.30084 6.05002 8.95004 6.69921 8.95004 7.50002C8.95004 8.30083 8.30084 8.95002 7.50004 8.95002C6.69923 8.95002 6.05004 8.30083 6.05004 7.50002Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="font-bold">Priority</span>
        </div>
      );
    },
    cell: ({ row }) => {
      const togglePriority = async () => {
        let newOutcome;
        switch (row.getValue("priority")) {
          case "Low":
            newOutcome = "Medium";
            break;
          case "Medium":
            newOutcome = "High";
            break;
          case "High":
            newOutcome = "Low";
            break;
          default:
            newOutcome = "Low";
            break;
        }

        const { error } = await supabase
          .from("internship") // replace with your table name
          .update({ priority: newOutcome })
          .eq("id", row.original.id); // replace 'id' with your actual id column name

        if (error) {
          console.error("Error updating priority:", error);
          toast.error(`${error.message}`, {
            style: {
              background: "#000000",
              color: "#fff",
            },
          });
        } else {
          toast.success(`Priority is ${newOutcome}`, {
            style: {
              background: "#000000",
              color: "#fff",
            },
          });
        }
      };
      if (row.getValue("priority") === "Low") {
        return (
          <div
            className="capitalize flex gap-1 items-center hover:text-green-300 cursor-pointer"
            onClick={togglePriority}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="font-semibold">Low</span>
          </div>
        );
      } else if (row.getValue("priority") === "Medium") {
        return (
          <div
            className="capitalize flex gap-1 items-center hover:text-yellow-300 cursor-pointer"
            onClick={togglePriority}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="font-semibold">Medium</span>
          </div>
        );
      } else {
        return (
          <div
            className="capitalize flex gap-1 items-center hover:text-red-300 cursor-pointer"
            onClick={togglePriority}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L11.8536 6.14645C12.0488 6.34171 12.0488 6.65829 11.8536 6.85355C11.6583 7.04882 11.3417 7.04882 11.1464 6.85355L8 3.70711L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 3.70711L3.85355 6.85355C3.65829 7.04882 3.34171 7.04882 3.14645 6.85355C2.95118 6.65829 2.95118 6.34171 3.14645 6.14645L7.14645 2.14645Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="font-semibold">High</span>
          </div>
        );
      }
    },
  },
  {
    accessorKey: "url",
    header: ({ column }) => {
      return (
        <div className="capitalize flex items-center gap-2 font-bold w-max "></div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="capitalize flex items-center gap-2 font-semibold w-max">
          <a
            href={row.getValue("url")}
            className="hover:text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
              <path
                d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
              <path
                d="M7.09991 13.5V1.5H7.89991V13.5H7.09991zM10.375 7.49998C10.375 5.32724 9.59364 3.17778 8.06183 1.75656L8.53793 1.24341C10.2396 2.82218 11.075 5.17273 11.075 7.49998 11.075 9.82724 10.2396 12.1778 8.53793 13.7566L8.06183 13.2434C9.59364 11.8222 10.375 9.67273 10.375 7.49998zM3.99969 7.5C3.99969 5.17611 4.80786 2.82678 6.45768 1.24719L6.94177 1.75281C5.4582 3.17323 4.69969 5.32389 4.69969 7.5 4.6997 9.67611 5.45822 11.8268 6.94179 13.2472L6.45769 13.7528C4.80788 12.1732 3.9997 9.8239 3.99969 7.5z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
              <path
                d="M7.49996 3.95801C9.66928 3.95801 11.8753 4.35915 13.3706 5.19448 13.5394 5.28875 13.5998 5.50197 13.5055 5.67073 13.4113 5.83948 13.198 5.89987 13.0293 5.8056 11.6794 5.05155 9.60799 4.65801 7.49996 4.65801 5.39192 4.65801 3.32052 5.05155 1.97064 5.8056 1.80188 5.89987 1.58866 5.83948 1.49439 5.67073 1.40013 5.50197 1.46051 5.28875 1.62927 5.19448 3.12466 4.35915 5.33063 3.95801 7.49996 3.95801zM7.49996 10.85C9.66928 10.85 11.8753 10.4488 13.3706 9.6135 13.5394 9.51924 13.5998 9.30601 13.5055 9.13726 13.4113 8.9685 13.198 8.90812 13.0293 9.00238 11.6794 9.75643 9.60799 10.15 7.49996 10.15 5.39192 10.15 3.32052 9.75643 1.97064 9.00239 1.80188 8.90812 1.58866 8.9685 1.49439 9.13726 1.40013 9.30601 1.46051 9.51924 1.62927 9.6135 3.12466 10.4488 5.33063 10.85 7.49996 10.85z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      const val = row.original.id;
      return (
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
            <AlertDialogDemo val={val} />
            <SheetSide />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DataTableDemo() {
  const [pageIndex, setPageIndex] = React.useState(0); // Start with the first page
  const [searchQuery, setSearchQuery] = React.useState("");
  const [status, setStatus] = React.useState("All");
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const user = useUser();
  const userId = user?.user?.id;
  const [data, setData] = React.useState([]);
  const inputRef = React.useRef();
  const [filterQuery, setFilterQuery] = React.useState("");

  const statuses = ["All", "Completed", "Not Completed"];
  const outcomes = ["All", "N/A", "Rejected", "Accepted"];
  const priority = ["All", "Low", "Medium", "High"]

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        inputRef.current.focus();
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [userId, data]);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("internship") // replace with your table name
      .select("*")
      .eq("userId", userId)
      .order("appDate", { ascending: true });
    if (error) {
      console.error("Error fetching data:", error);
      toast.error(`${error.message}`, {
        style: {
          background: "#000000",
          color: "#fff",
        },
      });
    } else {
      // Format the data
      const formattedData = data?.map((item) => ({
        companyName: item.companyName,
        role: item.role,
        location: item.location,
        position: item.position,
        appDate: item.appDate,
        status: item.status,
        url: item.url,
        outcome: item.outcome,
        priority: item.priority,
        id: item.id,
        intId: item.intId,
      }));
      setData(formattedData);
    }
  };

  const maxPages = 5;
  const pageSize = 5; // Or whatever your page size is

  const [selectedOutcomes, setSelectedOutcomes] = React.useState([outcomes[0]]);

  const toggleOutcome = (outcome) => {
    setSelectedOutcomes((prevOutcomes) => {
      if (outcome === "All") {
        return ["All"];
      }
      if (prevOutcomes.includes("All")) {
        return [outcome];
      }
      if (prevOutcomes.includes(outcome)) {
        return prevOutcomes.filter((o) => o !== outcome);
      } else {
        return [...prevOutcomes, outcome];
      }
    });
  };

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      // If there's a search query, check if the item matches the query
      const matchesSearchQuery =
        !searchQuery ||
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        );

      // If a status is selected, check if the item matches the status
      const matchesSelectedStatus = status === "All" || item.status === status;

      // If outcomes are selected, check if the item's outcome is included in the selected outcomes
      const matchesSelectedOutcomes =
        selectedOutcomes.includes("All") ||
        selectedOutcomes.includes(item.outcome);

      // Include the item if it matches the search query, the selected status, and the selected outcomes
      return (
        matchesSearchQuery && matchesSelectedStatus && matchesSelectedOutcomes
      );
    });
  }, [searchQuery, data, status, selectedOutcomes]);

  const slicedData = data.slice(0, maxPages * pageSize);
  const currentPageData = React.useMemo(() => {
    const startRow = pageIndex * pageSize;
    return filteredData.slice(startRow, startRow + pageSize);
  }, [pageIndex, pageSize, filteredData]);

  const table = useReactTable({
    data: currentPageData, // Use the sliced data here
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  function hideme(val) {
    React.useEffect(() => {
      const columnToHide = table.getAllColumns().find(column => (column.id === val));
      if (columnToHide && columnToHide.getIsVisible()) {
        columnToHide.toggleVisibility(false);
      }
    }, []);
  }
  

  return (
    <div className="mx-auto w-full">
      <div className="flex items-center py-4">
        <div className="relative max-w-sm">
          <Input
            ref={inputRef}
            placeholder="Filter internships..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="pl-10 border-neutral placeholder:text-secondary w-64"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <kbd className="absolute right-3 bg-opacity-80 top-1/2 transform -translate-y-1/2 kbd kbd-sm px-1 rounded text-xs">
            ⌘ + K
          </kbd>
        </div>
        <div className="ml-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="btn btn-sm border-neutral rounded-md bg-base-200 bg-opacity-80">
                <PlusCircledIcon className="h-4 w-4" />
                Status
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-base-100 w-[200px] p-0 border-neutral">
              <Command className="bg-base-100">
                <CommandInput placeholder="Status" />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {statuses.map((status1) => (
                      <CommandItem>
                        <button
                          key={status1}
                          onClick={() => setStatus(status1)}
                          className="w-full flex gap-3 items-center justify-between"
                        >
                          <RadioGroup
                            defaultValue="comfortable"
                            className="flex text-white"
                          >
                            <RadioGroupItem checked={status1 === status} />
                            <Label htmlFor="r1">{status1}</Label>
                          </RadioGroup>
                          {status1 === "All"
                            ? data.length
                            : data.filter((item) => item.status === status1)
                                .length}{" "}
                        </button>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="ml-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="btn btn-sm border-neutral rounded-md bg-base-200 bg-opacity-80">
                <PlusCircledIcon className="h-4 w-4" />
                Outcome
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-base-100 w-[200px] p-0 border-neutral">
              <Command className="bg-base-100">
                <CommandInput placeholder="Outcome" />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {outcomes.map((outcome) => (
                      <CommandItem>
                        <button
                          key={outcome}
                          onClick={() => toggleOutcome(outcome)}
                          className="w-full flex gap-3 bg-transparent items-center font-semibold justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={selectedOutcomes.includes(outcome)}
                            />
                            {outcome}
                          </div>
                          {outcome === "All"
                            ? data.length
                            : data.filter((item) => item.outcome === outcome)
                                .length}
                        </button>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              className="ml-auto border-neutral border bg-base-200 opacity-80"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              View <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border border-neutral bg-base-200 bg-opacity-50">
        <Table>
          <TableHeader className="bg-base-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} applications.
        </div>
        <div className="space-x-2">
          <button
            size="sm"
            onClick={() => setPageIndex((prev) => prev - 1)}
            disabled={pageIndex === 0}
            className="btn btn-sm btn-ghost rounded-md"
          >
            Previous
          </button>
          <button
            size="sm"
            onClick={() => setPageIndex((prev) => prev + 1)}
            disabled={(pageIndex + 1) * pageSize >= data.length}
            className="btn btn-sm btn-ghost rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
