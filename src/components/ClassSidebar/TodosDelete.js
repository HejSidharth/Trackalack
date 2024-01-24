import toast from "react-hot-toast";
import { supabase } from "../../supabaseClient";

export const deleteTodos = async (id) => {
    if (!id) {
      console.log("Note ID is not defined");
      return;
    }
  
    const { error } = await supabase
      .from("task") // replace with your table name
      .delete()
      .eq("taskId", id);
  
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