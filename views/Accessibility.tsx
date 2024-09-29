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
                <Text style={{ fontSize: SIZE.FONT.MD, fontWeight: "bold",marginBottom: SIZE.SPACE.MD }}>Accessability review</Text>
                <Text style={{ fontSize: SIZE.FONT.MD }}>
                    Facere is an app designed with a strong accessibility mindset, ensuring it is usable by everyone, regardless of their abilities. The app integrates features like voice commands, screen readers, adjustable text sizes, and high-contrast modes to cater to users with visual, auditory, or motor impairments. By prioritizing inclusivity, Facere delivers an intuitive experience that empowers all users to navigate and interact seamlessly, demonstrating its commitment to accessibility at every level of design and functionality.
                </Text>
                <Text style={{ fontSize: SIZE.FONT.MD }}>

                </Text>
            </View>
        </View>
    )
}