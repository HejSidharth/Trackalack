import { supabase } from "../../supabaseClient";

export const fetchNotes = async () => {
    const { data, error } = await supabase
        .from('notes')
        .select('*');

    if (error) {
        console.error('Error fetching notes', error);
        return null;
    } else {
        return data;
    }
};