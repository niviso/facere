import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { t } from "locale";
import { NavigationBar } from "@/components";
import type { RouteProps } from "@/types";
import {Size} from "@/constants";

export default function Accessibility({setView}:RouteProps){
    return (
        <View>
            <NavigationBar headlineText="Accessibility" leftBtn={{ text:""}} rightBtn={{ text: t("views.selectedLists.back"), icon: "chevron-back", onPress: () => setView("Settings") }} />
            <View style={{padding: 15}}>
            <Text style={{fontSize: 16}}>
            Facere is an app designed with a strong accessibility mindset, ensuring it is usable by everyone, regardless of their abilities. The app integrates features like voice commands, screen readers, adjustable text sizes, and high-contrast modes to cater to users with visual, auditory, or motor impairments. By prioritizing inclusivity, Facere delivers an intuitive experience that empowers all users to navigate and interact seamlessly, demonstrating its commitment to accessibility at every level of design and functionality.
            </Text> 
            <Text>Accessable tools</Text>
            </View>
        </View>
    )
}