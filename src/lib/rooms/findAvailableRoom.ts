import { supabase } from "../auth/supabase";

/**
 * Finds an available room of the given type for the specified date range.
 * Returns the room_id if available, or null if all rooms of that type are booked.
 */
export async function findAvailableRoom(
    typeId: number,
    startDate: string,
    endDate: string
): Promise<number | null> {
    // 1. Get all rooms of this type
    const { data: rooms, error: roomsError } = await supabase
        .from('rooms')
        .select('id')
        .eq('type_id', typeId);

    if (roomsError) throw roomsError;
    if (!rooms || rooms.length === 0) return null;

    const roomIds = rooms.map(r => r.id);

    // 2. Get conflicting reservations (overlapping date range, not cancelled)
    const { data: conflicting, error: conflictError } = await supabase
        .from('reservations')
        .select('room_id')
        .in('room_id', roomIds)
        .neq('status', 'cancelled')
        .lt('start_date', endDate)
        .gt('end_date', startDate);

    if (conflictError) throw conflictError;

    const bookedRoomIds = new Set((conflicting ?? []).map(r => r.room_id));

    // 3. Find first room that is NOT booked
    const availableRoom = rooms.find(r => !bookedRoomIds.has(r.id));

    return availableRoom ? availableRoom.id : null;
}
