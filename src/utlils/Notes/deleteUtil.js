import { supabase } from "../../supabaseClient";

export const deleteNote = async (id) => {
    const { data, error } = await supabase.from("internship").delete().eq("id", id);

    if (error) {
      console.error("Error deleting note:", error);
    } else {
      console.log("Note deleted:", data);
    }
  };