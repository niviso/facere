import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface ActionButton {
    onPress: Function;
    text: string;
    icon?: string;
}

interface NavBarProps {
    leftBtn?: ActionButton | any;
    rightBtn?: ActionButton | any;
    headline: string;
}
export default function NavigationBar({leftBtn,rightBtn, headline}:NavBarProps){
    
    return (
        <View>
            <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 70, paddingBottom: 15, width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                {rightBtn && 
                <TouchableOpacity onPress={rightBtn.onPress} style={{ width: 100,display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    {rightBtn.icon && <Ionicons name={rightBtn.icon} size={20} color="rgba(0,0,0,0.8)" />}
                    <Text style={{textAlign:"right"}}>{rightBtn.text}</Text>
                </TouchableOpacity>}
                <Text style={{ textAlign:"center",fontSize: leftBtn && rightBtn ? 22 : 32, color: "black", fontWeight: "bold" }}>{headline}</Text>
                {leftBtn && <TouchableOpacity onPress={leftBtn.onPress} style={{ width: 100,display: "flex",flexDirection:"row",justifyContent:"flex-end",alignItems: "center" }}>
                    <Text>{leftBtn.text}</Text>
                    {leftBtn.icon && <Ionicons name={leftBtn.icon} size={20} color="rgba(0,0,0,0.8)" />}
                </TouchableOpacity>}
            </View>
        </View>
    )
}