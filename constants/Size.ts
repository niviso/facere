const ICON = {
    SM: 12,
    MD: 16,
    LG: 32
} as const;

const SPACE = {
    SM: 10,
    MD: 15,
    LG: 30
} as const;

const FONT = {
    SM: 12,
    MD: 18,
    LG: 32
}

const SIZE = {
    ICON: ICON,
    SPACE: SPACE,
    FONT: FONT
} as const;


export default SIZE;