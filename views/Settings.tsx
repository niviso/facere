import { View, Text, Button, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { t } from "locale";
import { NavigationBar } from "@/components";
import { useState, useReducer } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLOR, Size } from "@/constants";
import { setLocale, getLocale } from "locale";
import appData from "../app.json";
import { Store } from "@/utilities";

function Picker({ options, value, onUpdate }: any) {
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

export default function Settings({ setView }) {
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const styles = StyleSheet.create({
        appDetailText: { fontSize: Size.FONT.SM, fontWeight: "bold", color: COLOR.BLACK },
        appDescriptionWrapper: { padding: 15, opacity: 0.9, marginBottom: 15, gap: 10 },
        appDescriptionText: { fontSize: Size.FONT.MD, color: COLOR.BLACK, height: "50%" },
        deleteBtnWrapper: { marginTop: 15 }
    });

    function deleteAllData() {
        const title = t("prompt.wipe_data.prompt_title");
        const subtitle = t("prompt.wipe_data.prompt_subtitle");
        Alert.alert(title, subtitle, [
            {
                text: t("prompt.wipe_data.cancel"),
                style: "cancel",
            },
            { text: t("prompt.wipe_data.erase"), onPress: () => Store.wipe() },
        ]);

    }
    return (
        <View>
            <NavigationBar headlineText="Settings" leftBtn={{ icon: "information-circle", onPress: () => setView("Home") }} rightBtn={{ text: t("views.selectedLists.back"), icon: "chevron-back", onPress: () => setView("Home") }} />
            <Picker options={[{ name: "English", value: "en" }, { name: "Svenska", value: "sv" }]} value={getLocale()} onUpdate={(option) => { setLocale(option); forceUpdate() }} />
            <View style={styles.appDescriptionWrapper}>
                <Text style={styles.appDetailText}>{appData.expo.name.toUpperCase()}</Text>
                <Text style={styles.appDetailText}>Version {appData.expo.version}</Text>
                <Text style={styles.appDetailText}>{t("view.settings.created_by", [{ name: "creator", value: appData.expo.author }])}</Text>
                <Text style={styles.appDescriptionText}>
                    {t("view.settings.intro")}
                </Text>
            </View>
            <View style={styles.deleteBtnWrapper}>
                <Button title={t("view.settings.delete_data")} onPress={deleteAllData} />
            </View>
        </View>
    )
}