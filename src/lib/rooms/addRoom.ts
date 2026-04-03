import { supabase } from "../supabase";

export async function addRoom(type_id: number) {
    const { data, error } = await supabase.from('rooms').insert({
        type_id
    }).select().single();

    if (error) {
        throw error;
    }

    return data;
}