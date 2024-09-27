import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { t } from "locale";
import { NavigationBar, Picker } from "@/components";
import { useReducer } from "react";
import { COLOR, Size } from "@/constants";
import { setLocale, getLocale } from "locale";
import appData from "../app.json";
import { Store } from "@/utilities";

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