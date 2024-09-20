import BouncyCheckbox from "react-native-bouncy-checkbox";
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';
import Card from "./Card";

interface ItemProps {
    id: string;
    text: string;
    timestamp: string;
    complete: boolean;
    hasBeenUpdated: boolean;
    toggleItemComplete: Function;
    onDelete: Function;
    isImportant: boolean;
    toggleImportant: Function;
}

function Item({ id, text, timestamp, complete, toggleItemComplete, hasBeenUpdated, isImportant, onDelete, toggleImportant }: ItemProps) {

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
    function toggle(value: boolean) {
        if (value) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
        } else {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        }
        toggleItemComplete(value, id);
    }
    const renderLeftActions = (progress: any, dragX: any) => {
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
            <Card id={id} text={text} eyebrow={moment(timestamp).fromNow()} inactive={complete} backgroundColor={isImportant ? "#ffdc73" : "white"} onLongPress={() => toggleImportant(id)} cta={
                <BouncyCheckbox
                fillColor="green"
                isChecked={complete}
                onPress={toggle}
                size={22}
                textContainerStyle={{
                    marginLeft: 0
                }}
                style={{marginLeft:0,marginRight:0}}
            />} />
        </Swipeable>
    )
}

export { ItemProps, Item }