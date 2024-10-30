import { View, Text } from "react-native";
import { t } from "locale";
import { NavigationBar } from "@/components";
import type { RouteProps } from "@/types";
import { SIZE, ROUTES } from "@/constants";

export default function Accessibility({ setView }: RouteProps) {
    return (
        <View>
            <NavigationBar headlineText={t("views.accessibility.headline")} leftBtn={{ text: "" }} rightBtn={{ text: t("views.selectedList.back"), icon: "chevron-back", onPress: () => setView(ROUTES.SETTINGS) }} />
            <View style={{ padding: SIZE.SPACE.MD }}>
                <Text style={{ fontSize: SIZE.FONT.MD, fontWeight: "bold",marginBottom: SIZE.SPACE.MD }}>{t("views.accessibility.headline")}</Text>
                <Text style={{ fontSize: SIZE.FONT.MD }}>
                    {t("views.accessibility.description")}
                </Text>
                <Text style={{ fontSize: SIZE.FONT.MD }}>

                </Text>
            </View>
        </View>
    )
}