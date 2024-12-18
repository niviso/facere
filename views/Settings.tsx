import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { t } from "locale";
import { NavigationBar, Picker } from "@/components";
import { useReducer } from "react";
import { COLOR, SIZE, ROUTES } from "@/constants";
import { setLocale, getLocale } from "locale";
import appData from "../app.json";
import { Store } from "@/utilities";
import type { RouteProps } from "@/types";
import moment from "moment";

export default function Settings({ setView }: RouteProps) {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const pickerData = [{ name: "English", value: "en" }, { name: "Svenska", value: "sv" }]

    const styles = StyleSheet.create({
        appDetailText: { fontSize: SIZE.FONT.SM, fontWeight: "bold", color: COLOR.BLACK },
        appDescriptionWrapper: { padding: SIZE.SPACE.MD, opacity: 0.9, marginBottom: SIZE.SPACE.MD, gap: SIZE.SPACE.SM },
        appDescriptionText: { fontSize: SIZE.FONT.MD, color: COLOR.BLACK, height: "50%" },
        deleteBtnWrapper: { marginTop: SIZE.SPACE.MD }
    });

    function deleteAllData(): void {
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
            <NavigationBar headlineText={t("views.settings.name")} leftBtn={{ icon: "accessibility-sharp", onPress: () => setView(ROUTES.ACCESSIBILITY) }} rightBtn={{ text: t("views.selectedList.back"), icon: "chevron-back", onPress: () => setView(ROUTES.HOME) }} />
            <Picker options={pickerData} value={getLocale()} onUpdate={(option: string) => { setLocale(option); moment.locale(option); forceUpdate() }} />
            <View style={styles.appDescriptionWrapper}>
                <Text style={styles.appDetailText}>{appData.expo.name.toUpperCase()}</Text>
                <Text style={styles.appDetailText}>{t("views.settings.version", [{ name: "version", value: appData.expo.version }])}</Text>
                <Text style={styles.appDetailText}>{t("views.settings.created_by", [{ name: "creator", value: appData.expo.author }])}</Text>
                <Text style={styles.appDescriptionText}>
                    {t("views.settings.intro")}
                </Text>
            </View>
            <View style={styles.deleteBtnWrapper}>
                <Button title={t("views.settings.delete_data")} onPress={deleteAllData} />
            </View>
        </View>
    )
}