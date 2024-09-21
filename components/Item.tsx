import BouncyCheckbox from "react-native-bouncy-checkbox";
import { StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import moment from 'moment';
import Card from "./Card";
import {Size} from "@/constants";
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

    });
    function toggle(value: boolean) {
        if (value) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
        } else {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        }
        toggleItemComplete(value, id);
    }
    return (
            <Card id={id} onDelete={onDelete} text={text} eyebrow={moment(timestamp).fromNow()} inactive={complete} backgroundColor={isImportant ? "#ffdc73" : "white"} onLongPress={() => toggleImportant(id)} cta={
                <BouncyCheckbox
                fillColor="green"
                isChecked={complete}
                onPress={toggle}
                size={Size.Icon.lg}
                textContainerStyle={{
                    marginLeft: 0
                }}
                style={{marginLeft:0,marginRight:0}}
            />} />
    )
}

export { ItemProps, Item }