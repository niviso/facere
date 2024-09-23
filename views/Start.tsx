import { TouchableOpacity, Text, StyleSheet } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import Fontisto from '@expo/vector-icons/Fontisto';
import { COLOR, Size } from "@/constants";
import {t} from "locale";
export default function Start({ setView }) {
    async function unlock() {

        const compatible = await LocalAuthentication.hasHardwareAsync()
        if (!compatible) throw 'This device is not compatible for biometric authentication'
        const enrolled = await LocalAuthentication.isEnrolledAsync()
        if (!enrolled) throw "This device doesn't have biometric authentication enabled"
        const result = await LocalAuthentication.authenticateAsync({ promptMessage: "Unlock your lists", fallbackLabel: "test" })
        if (!result.success) throw `${result.error} - Authentication unsuccessful`

        if (result.success) {
            setView("Home")
        } else {

        }
    }

    const styles = StyleSheet.create({
        wrapper: { width: "100%", height: "100%", backgroundColor: COLOR.WHITE, display: "flex", alignItems: "center", justifyContent: "center" },
        title: { fontSize: 100, fontWeight: "bold", color: COLOR.BLACK },
        subtitle: { fontSize: Size.FONT.MD, fontWeight: "light", color: COLOR.BLACK, textAlign: "center" }
    });
    return (
        <TouchableOpacity onPress={unlock} style={styles.wrapper}>
            <Fontisto name="locked" size={90} color={COLOR.BLACK} />
            <Text style={styles.title}>{t("views.start.title")}</Text>
            <Text style={styles.subtitle}>{t("views.start.subtitle")}</Text>
        </TouchableOpacity>
    )
}