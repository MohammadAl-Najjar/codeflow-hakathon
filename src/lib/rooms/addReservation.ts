import { supabase } from "../auth/supabase";

export async function addReservation(
    room_id: number,
    user_id: string,
    start_date: string,
    end_date: string,
    status: 'pending' | 'confirmed' | 'cancelled' = 'confirmed'
) {
    const { data, error } = await supabase.from('reservations').insert({
        room_id,
        user_id,
        start_date,
        end_date,
        status,
    }).select().single();

    if (error) {
        throw error;
    }

    return data;
}