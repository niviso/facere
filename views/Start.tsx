import { TouchableOpacity, Text, StyleSheet } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import Fontisto from '@expo/vector-icons/Fontisto';
import { COLOR, SIZE, ROUTES } from "@/constants";
import {t} from "locale";
import type { RouteProps } from "@/types";

export default function Start({ setView }:RouteProps) {
    async function unlock():Promise<void> {

        const compatible = await LocalAuthentication.hasHardwareAsync()
        if (!compatible) throw t("auth.compatible")
        const enrolled = await LocalAuthentication.isEnrolledAsync()
        if (!enrolled) throw t("auth.enabled")
        const result = await LocalAuthentication.authenticateAsync({ promptMessage: t("auth.prompt_message"), fallbackLabel: t("auth.fallback") })
        if (!result.success) throw t("auth.auth_error")

        if (result.success) {
            setView(ROUTES.HOME)
        }
    }

    const styles = StyleSheet.create({
        wrapper: { width: SIZE.FILL, height: SIZE.FILL, backgroundColor: COLOR.WHITE, display: "flex", alignItems: "center", justifyContent: "center" },
        title: { fontSize: SIZE.FONT.XL, fontWeight: "bold", color: COLOR.BLACK },
        subtitle: { fontSize: SIZE.FONT.MD, fontWeight: "light", color: COLOR.BLACK, textAlign: "center" }
    });
    return (
        <TouchableOpacity onPress={unlock} style={styles.wrapper}>
            <Fontisto name="locked" size={SIZE.ICON.XL} color={COLOR.BLACK} />
            <Text style={styles.title}>{t("views.start.title")}</Text>
            <Text style={styles.subtitle}>{t("views.start.subtitle")}</Text>
        </TouchableOpacity>
    )
}