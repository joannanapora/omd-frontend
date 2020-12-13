export enum Location {
    NORTH,
    NORTH_WEST,
    NORTH_EAST,
    WEST,
    EAST,
    SOUTH,
    SOUTH_WEST,
    SOUTH_EAST,
}

export const mapOptionsToLocation = (location): Location => {
    if (location === 'north') {
        return Location.NORTH;
    }
    if (location === 'north-west') {
        return Location.NORTH_WEST;
    }
    if (location === 'north-east') {
        return Location.NORTH_EAST;
    }
    if (location === 'west') {
        return Location.WEST;
    }
    if (location === 'east') {
        return Location.EAST;
    }
    if (location === 'south') {
        return Location.SOUTH;
    }
    if (location === 'south-west') {
        return Location.SOUTH_WEST;
    }
    if (location === 'south-east') {
        return Location.SOUTH_EAST;
    }
};



export const mapLocationsToOptions = (option: number): string => {
    if (option === 0) {
        return "north";
    }
    if (option === 1) {
        return "north-west";
    }
    if (option === 2) {
        return "north-east";
    }
    if (option === 3) {
        return "west";
    }
    if (option === 4) {
        return "east";
    }
    if (option === 5) {
        return "south";
    }
    if (option === 6) {
        return "south-west";
    }
    if (option === 7) {
        return "south-east";
    }
};