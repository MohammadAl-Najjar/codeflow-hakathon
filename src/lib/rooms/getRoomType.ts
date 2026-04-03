import { supabase } from "../auth/supabase";

export async function getRoomType(type_name?: string) {
    if (type_name) {
        const { data, error } = await supabase.from('room_types').select('*').eq('name', type_name).single();
        if (error) {
            throw error;
        }
        return data;
    }
    const { data, error } = await supabase.from('room_types').select('*');

    if (error) {
        throw error;
    }

    return data;
}