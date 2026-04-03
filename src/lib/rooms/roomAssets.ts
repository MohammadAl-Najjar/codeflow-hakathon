/**
 * Static assets for room types — maps room type IDs to images and descriptions
 * since these are UI/marketing assets, not database content.
 */
export const ROOM_TYPE_IMAGES: Record<number, string> = {
    1: '/images/luxury-suite.png',    // Single Room
    2: '/images/city-view.png',       // Double Room
    3: '/images/luxury-suite.png',    // Suite
    4: '/images/balcony-garden.png',  // Family Room
    5: '/images/city-view.png',       // Penthouse
};

export function getRoomImage(typeId: number): string {
    return ROOM_TYPE_IMAGES[typeId] ?? '/images/hotel-hero.png';
}
