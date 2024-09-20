import BouncyCheckbox from "react-native-bouncy-checkbox";
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';
import { useState } from "react";
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
        container: {
            width: "100%",
            padding: 10,
            borderBottomWidth: 1,
            borderTopWidth: isImportant ? 1 : 0,
            borderColor: isImportant ? "black" : "rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: isImportant ? "#FEF3C7" : "white"
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
        topText: {
            fontSize: 12,
            opacity: 0.5
        }
    });
    function toggle(value) {
        if (value) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
        } else {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        }
        toggleItemComplete(value, id);
    }
    const renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 100, 100, 101],
            outputRange: [-100, 0, 0, 1],
        });
        return (
            <TouchableOpacity style={{ height: "100%" }} onPress={() => onDelete(id)}>
                <Animated.View style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: 10,
                    width: 100,
                    height: "100%",
                    backgroundColor: "#ff0f0f",
                    transform: [{ translateX: trans }],
                }}>
                    <Animated.Text
                        style={
                            {
                                fontSize: 18,
                                color: "white"
                            }}>
                        Delete
                    </Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        );
    };
    return (
        <Swipeable renderLeftActions={renderLeftActions} overshootLeft={true} onSwipeableOpen={(e) => console.log(e)}>
            <Card text={text} eyebrow={moment(timestamp).fromNow()} inactive={complete} backgroundColor={isImportant ? "lightgrey" : "white"} onLongPress={() => toggleImportant(id)} cta={<BouncyCheckbox
                fillColor="green"
                isChecked={complete}
                onPress={toggle}
                size={25}
                style={{ padding: 0, margin: 0 }}
            />}/>
        </Swipeable>
    )
}

export { ItemProps, Item }