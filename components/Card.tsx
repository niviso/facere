import { ReactElement, ReactNode } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
interface CardProps {
    id: string;
    eyebrow?: string;
    text: string;
    cta?: ReactElement;
    onPress?: Function;
    backgroundColor?: string;
    onLongPress?: string;
    inactive?: boolean;
}

function CardCta({ children }: any) {
    return <>{children}</>
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
        text: {
            width: "80%", color: "black"
        },
        ctaText: {

        }
    });
    return (
        <TouchableOpacity style={{
            ...styles.container, backgroundColor: backgroundColor ? backgroundColor : "white",
            opacity: inactive ? 0.5 : 1
        }} onPress={onPress} onLongPress={onLongPress}>
            <View style={styles.innerContainer}>
                <Text style={styles.eyebrowText}>{eyebrow}</Text>
                <Text numberOfLines={1} style={styles.text}>{text}</Text>
            </View>
            <View>
                {cta}
            </View>
        </TouchableOpacity>
    )

}