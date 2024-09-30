import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { t } from "locale";
import { NavigationBar } from "@/components";
import type { RouteProps } from "@/types";
import { SIZE } from "@/constants";

export default function Accessibility({ setView }: RouteProps) {
    return (
        <View>
            <NavigationBar headlineText="Accessibility" leftBtn={{ text: "" }} rightBtn={{ text: t("views.selectedLists.back"), icon: "chevron-back", onPress: () => setView("Settings") }} />
            <View style={{ padding: SIZE.SPACE.MD }}>
                <Text style={{ fontSize: SIZE.FONT.LG, fontWeight: "bold",marginBottom: SIZE.SPACE.MD }}>{t("view.accessibility.headline")}</Text>
                <Text style={{ fontSize: SIZE.FONT.MD }}>
                    {t("view.accessibility.description")}
                </Text>
                <Text style={{ fontSize: SIZE.FONT.MD }}>

                </Text>
            </View>
        </View>
    )
}