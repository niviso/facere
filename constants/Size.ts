const ICON = {
    SM: 12,
    MD: 16,
    LG: 32
} as const;

const PADDING = {
    sm: 5,
    md: 15,
    lg: 30
} as const;

const FONT = {
    SM: 12,
    MD: 18,
    LG: 32
}

const SIZE = {
    ICON: ICON,
    PADDING: PADDING,
    FONT: FONT
} as const;


export default SIZE;