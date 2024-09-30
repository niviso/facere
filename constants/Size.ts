import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ICON = {
    SM: 12,
    MD: 16,
    LG: 32,
    XL: 60
} as const;

const SPACE = {
    XS: 5,
    SM: 10,
    MD: 15,
    LG: 30,
    XL: 60,
    SAFEAREA: 70
} as const;

const FONT = {
    SM: 12,
    MD: 18,
    LG: 32,
    XL: 60
} as const;

const SIZE = {
    ICON: ICON,
    SPACE: SPACE,
    FONT: FONT,
    FILL: "100%",
    WINDOW_WIDTH: windowWidth,
    WINDOW_HEIGHT: windowHeight
} as const;


export default SIZE;