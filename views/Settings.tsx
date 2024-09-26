import {View,Text,Button} from "react-native";
import {t} from "locale";
import { NavigationBar } from "@/components";
export default function Settings({setView}){
    return (
        <View>
            <NavigationBar headlineText="Settings" rightBtn={{ text: t("views.selectedLists.back"), icon: "chevron-back", onPress: () => setView("Home") }}/>
                <Button title="Delete all data"/>
        </View>
    )
}