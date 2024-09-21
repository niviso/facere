import { ReactElement } from "react";
import { View, Text, TouchableOpacity, StyleSheet,Animated } from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';

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
}

export default function Card({ id, eyebrow, text, cta, onPress, backgroundColor, onLongPress, inactive,onDelete }: CardProps) {
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
    const renderLeftActions = (progress: any, dragX: any) => {
        const styles = StyleSheet.create({
            swipableLeftButton: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                width: 100,
                height: "100%",
                backgroundColor: "#ff0f0f",
            },
            swipableLeftButtonText: {
                fontSize: 18,
                color: "white"
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
        <Swipeable renderLeftActions={renderLeftActions} overshootLeft={true} onSwipeableOpen={(e) => console.log(e)}>
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