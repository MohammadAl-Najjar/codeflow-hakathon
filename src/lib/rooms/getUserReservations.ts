import { supabase } from "../supabase";

export interface Reservation {
    id: number;
    room_id: number;
    user_id: string;
    start_date: string;
    end_date: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    room_type?: {
        label: string;
        price: number;
        capacity: number;
    };
}

/**
 * Fetches all reservations for the given user, with room type info joined.
 */
export async function getUserReservations(userId: string): Promise<Reservation[]> {
    const { data, error } = await supabase
        .from('reservations')
        .select(`
            *,
            rooms!inner (
                type_id,
                room_types!inner (
                    label,
                    price,
                    capacity
                )
            )
        `)
        .eq('user_id', userId)
        .order('start_date', { ascending: false });

    if (error) {
        throw error;
    }

    // Flatten the nested join
    return (data ?? []).map((r: any) => ({
        id: r.id,
        room_id: r.room_id,
        user_id: r.user_id,
        start_date: r.start_date,
        end_date: r.end_date,
        status: r.status,
        room_type: r.rooms?.room_types ? {
            label: r.rooms.room_types.label,
            price: r.rooms.room_types.price,
            capacity: r.rooms.room_types.capacity,
        } : undefined,
    }));
}
