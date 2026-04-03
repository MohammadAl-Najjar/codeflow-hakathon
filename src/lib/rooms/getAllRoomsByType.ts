import { supabase } from "../auth/supabase";

export async function getAllRoomsByType(type_id: number) {
    const { data, error } = await supabase.from('rooms').select('*').eq('type_id', type_id);

    if (error) {
        throw error;
    }

    return data;
}