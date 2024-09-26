import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Haptics from 'expo-haptics';
import moment from 'moment';
import Card from "./Card";
import { Size, COLOR } from "@/constants";
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

    function toggle(value: boolean) {
        if (value) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
        } else {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        }
        toggleItemComplete(value, id);
    }
    return (
        <Card id={id} textColor={isImportant ? COLOR.WHITE : COLOR.BLACK}
            onDelete={onDelete} text={text} eyebrow={moment(timestamp).fromNow()} inactive={complete} backgroundColor={isImportant ? COLOR.BLACK : COLOR.WHITE} onLongPress={() => toggleImportant(id)} cta={
                <BouncyCheckbox
                    fillColor={COLOR.SUCCESS}
                    isChecked={complete}
                    onPress={toggle}
                    size={Size.Icon.lg}
                    textContainerStyle={{
                        marginLeft: 0
                    }}
                    style={{ marginLeft: 0, marginRight: 0 }}
                />} />
    )
}

export { ItemProps, Item }