const Icon = {
    sm: 12,
    md: 16,
    lg: 32
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

const Size = {
    Icon: Icon,
    PADDING: PADDING,
    FONT: FONT
} as const;


export default Size;