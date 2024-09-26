import { ReactElement } from "react";
import { View, Text, TouchableOpacity, StyleSheet,Animated } from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {COLOR, Size} from "@/constants";
interface CardProps {
    id: string;
    eyebrow?: string;
    text: string;
    cta?: ReactElement;
    onPress?: Function | any;
    backgroundColor?: string;
    onLongPress?: Function | any;
    inactive?: boolean;
    onDelete: Function;
    textColor?: string;
}

export default function Card({ id, eyebrow, text, cta, onPress, backgroundColor, textColor=COLOR.BLACK, onLongPress, inactive,onDelete }: CardProps) {
    const styles = StyleSheet.create({
        container: {
            width: "100%",
            padding: 10,
            paddingLeft: 15,
            paddingRight: 15,
            borderBottomWidth: 1,
            borderColor: COLOR.BORDER_COLOR,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: backgroundColor ? backgroundColor : COLOR.WHITE,
        },
        innerContainer: {
            display: "flex",
            flexDirection: "column",
            width: "80%",
            gap: 5
        },
        baseText: {
            fontSize: Size.FONT.MD,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            textDecorationLine: "line-through",
        },
        eyebrowText: {
            fontSize: Size.FONT.SM,
            color: textColor
        },
        mainText: {
            width: "80%",
            color: textColor,
            textDecorationLine: inactive ? 'line-through' : undefined,
            fontSize: Size.FONT.MD
        }
    });
    const renderLeftActions = (progress: any, dragX: any) => {
            const styles = StyleSheet.create({
        swipableLeftButton: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            width: 100,
            height: "100%",
            backgroundColor: COLOR.ERROR,
        },
        swipableLeftButtonText: {
            fontSize: Size.FONT.MD,
            color: COLOR.WHITE
        },
        swipableLeftWrapper: {
            height: "100%"
        }
    });
        const trans = dragX.interpolate({
            inputRange: [0, 100, 100, 101],
            outputRange: [-100, 0, 0, 1],
        });
        return (
            <TouchableOpacity style={styles.swipableLeftWrapper} onPress={() => onDelete(id)}>
                <Animated.View style={{ ...styles.swipableLeftButton, transform: [{ translateX: trans }], }}>
                    <Text style={styles.swipableLeftButtonText}>
                        Delete
                    </Text>
                </Animated.View>
            </TouchableOpacity>
        );
    };
    return (
        <Swipeable renderLeftActions={renderLeftActions}>
        <TouchableOpacity id={id} style={styles.container} onPress={onPress} onLongPress={onLongPress}>
            <View style={styles.innerContainer}>
                <Text style={styles.eyebrowText}>{eyebrow}</Text>
                <Text numberOfLines={1} style={styles.mainText}>{text}</Text>
            </View>
            <View>
                {cta}
            </View>
        </TouchableOpacity>
        </Swipeable>
    )

}