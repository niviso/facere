import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { t } from "locale";
import { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLOR, Size } from "@/constants";

export default function Picker({ options, value, onUpdate }: any) {
    const [selected, setSelected] = useState(value);

    function select(option: string) {
        onUpdate && onUpdate(option);
        setSelected(option);
    }

    const styles = StyleSheet.create({
        wrapper: { display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 15, borderBottomWidth: 1, borderColor: COLOR.BORDER_COLOR },
    });
    return (
        <View style={{ padding: 0 }}>
            <View style={{ paddingLeft: 15, paddingBottom: 15 }}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>{t("view.settings.language")}</Text>
            </View>
            {options.map((option: any, index: number) => {
                return (
                <TouchableOpacity key={`picker-${index}`} onPress={() => select(option.value)} style={{...styles.wrapper,backgroundColor: option.value === selected ? COLOR.BORDER_COLOR : COLOR.WHITE}}>
                    <Text style={{ fontWeight: option.value === selected ? "bold" : "normal" }}>{option.name}</Text>
                    {option.value === selected && <Ionicons name="checkmark" size={Size.Icon.md} color={COLOR.BLACK}/>}
                </TouchableOpacity>)
            })}

        </View>
    )
}