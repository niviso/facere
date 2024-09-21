const Icon = {
    sm: 12,
    md: 16,
    lg: 32
} as const;

const Padding = {
    sm: 5,
    md: 15,
    lg: 30
} as const;

const Size = {
    Icon: Icon,
    Padding: Padding
} as const;


export default Size;