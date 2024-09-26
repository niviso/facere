import { View, Text, Button, TouchableOpacity } from "react-native";
import { t } from "locale";
import { NavigationBar } from "@/components";
import { getLocale } from "locale";
import { useState, useReducer } from "react";
import {Card} from "@/components";
import Ionicons from '@expo/vector-icons/Ionicons';
import {COLOR} from "@/constants";
import {setLocale} from "locale";
import appData from "../app.json";
function Picker({options,value, onUpdate}:any) {
    const [selected,setSelected] = useState(value);

    function select(option:string) {
        onUpdate && onUpdate(option);
        setSelected(option);
    }
    return (
        <View style={{padding: 0}}>
        <View style={{paddingLeft: 15,paddingBottom: 15}}>
            <Text style={{fontSize: 22,fontWeight:"bold"}}>Language</Text>
        </View>
        {options.map((option:any,index:number) => {
            return (<TouchableOpacity key={`picker-${index}`} onPress={() => select(option.value)} style={{display: "flex",flexDirection:"row",justifyContent:"space-between",backgroundColor: option.value === selected  ? "rgba(0,0,0,0.1)" : "white",padding: 15,borderBottomWidth: 1,borderColor: "rgba(0,0,0,0.1)"}}>
                <Text style={{fontWeight: option.value === selected  ? "bold" : "normal"}}>{option.name}</Text>
                {option.value === selected && <Ionicons name="checkmark" size={16} color="black" />}
            </TouchableOpacity>)
        })}
        
        </View>
    )
}

export default function Settings({ setView }) {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    return (
        <View>
            <NavigationBar headlineText="Settings" leftBtn={{ icon: "information-circle", onPress: () => setView("Home") }} rightBtn={{ text: t("views.selectedLists.back"), icon: "chevron-back", onPress: () => setView("Home") }} />
            <Picker options={[{name: "English", value: "en"},{name: "Swedish", value: "sv"}]} value="sv" onUpdate={(option) => {setLocale(option); forceUpdate()}}/>
            <View style={{padding: 15,opacity: 0.9,marginBottom: 15,gap: 10}}>
            <Text style={{fontSize: 12,fontWeight: "bold"}}>Version {appData.expo.version}</Text>
            <Text style={{fontSize: 12,fontWeight: "bold"}}>App created by Nikki Sollid</Text>
                <Text style={{fontSize: 16}}>
                    {t("view.settings.intro")}
                </Text>
            </View>
            <View style={{marginTop: 15}}>
            <Button title={t("view.settings.delete_data")} />
            </View>
        </View>
    )
}