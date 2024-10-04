import { ReactElement } from "react";
import {GestureResponderEvent} from "react-native";
export default interface CardProps {
    id: string;
    eyebrow?: string;
    text: string;
    cta?: ReactElement;
    onPress?: (event: GestureResponderEvent) => void;
    backgroundColor?: string;
    onLongPress?: (event: GestureResponderEvent) => void;
    inactive?: boolean;
    onDelete: Function;
    textColor?: string;
}