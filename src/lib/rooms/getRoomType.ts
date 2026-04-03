import { supabase } from "../auth/supabase";

export interface RoomType {
    id: number;
    label: string;
    capacity: number;
    price: number;
    created_at: string;
}

export async function getRoomTypes(): Promise<RoomType[]> {
    const { data, error } = await supabase.from('room_types').select('*').order('id');

    if (error) {
        throw error;
    }

    return data;
}