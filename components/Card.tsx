import { ReactElement } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
interface CardProps {
    id: string;
    eyebrow?: string;
    text: string;
    cta?: ReactElement;
    onPress?: Function | any;
    backgroundColor?: string;
    onLongPress?: Function | any;
    inactive?: boolean;
}

export default function Card({ id, eyebrow, text, cta, onPress, backgroundColor, onLongPress, inactive }: CardProps) {
    const styles = StyleSheet.create({
        container: {
            width: "100%",
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,
            borderBottomWidth: 1,
            borderColor: "rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: backgroundColor ? backgroundColor : "white",
        },
        innerContainer: {
            display: "flex",
            flexDirection: "column",
            width: "80%",
            gap: 5
        },
        baseText: {
            fontSize: 18,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            textDecorationLine: "line-through",
        },
        eyebrowText: {
            fontSize: 12,
            opacity: 0.5
        },
        mainText: {
            width: "80%",
            color: "black",
            textDecorationLine: inactive ? 'line-through' : undefined
        }
    });
    return (
        <TouchableOpacity id={id} style={styles.container} onPress={onPress} onLongPress={onLongPress}>
            <View style={styles.innerContainer}>
                <Text style={styles.eyebrowText}>{eyebrow}</Text>
                <Text numberOfLines={1} style={styles.mainText}>{text}</Text>
            </View>
            <View>
                {cta}
            </View>
        </TouchableOpacity>
    )

}