import BouncyCheckbox from "react-native-bouncy-checkbox";
import moment from 'moment';
import Card from "./Card";
import { SIZE, COLOR } from "@/constants";
import { Interaction } from "@/utilities";
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

export default function Item({ id, text, timestamp, complete, toggleItemComplete, hasBeenUpdated, isImportant, onDelete, toggleImportant }: ItemProps) {

    function toggle(value: boolean) {
        if (value) {
            Interaction.on();
        } else {
            Interaction.off();

        }
        toggleItemComplete(value, id);
    }
    return (
        <Card id={id} textColor={isImportant ? COLOR.WHITE : COLOR.BLACK} onDelete={onDelete} text={text} eyebrow={moment(timestamp).fromNow()} inactive={complete} backgroundColor={isImportant ? COLOR.BLACK : COLOR.WHITE} onLongPress={() => toggleImportant(id)} cta={
            <BouncyCheckbox
                fillColor={COLOR.SUCCESS}
                isChecked={complete}
                onPress={toggle}
                size={SIZE.ICON.LG}
                textContainerStyle={{
                    marginLeft: 0
                }}
                style={{ marginLeft: 0, marginRight: 0 }}
            />} />
    );
}