export const CELL_STATUS = {
    DEAD: 0,
    YOUNG: 1,
    OLD: 2,
};

/** Base interval between cell life cycles (400ms / .4s) */
export const BASE_INTERVAL_MS = 400;

/** Life cycle interval speed multipliers */
export const SPEED_MULTIPLIERS = [1, 2, 5, 10];
