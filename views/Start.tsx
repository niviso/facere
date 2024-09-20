import { TouchableOpacity, Text } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import Fontisto from '@expo/vector-icons/Fontisto';

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
        }
    }
    return (
        <TouchableOpacity onPress={unlock} style={{ width: "100%", height: "100%", backgroundColor: "orange", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Fontisto name="locked" size={100} color="white" />
            <Text style={{ fontSize: 100, fontWeight: "bold", color: "white" }}>FACERE</Text>
            <Text style={{ fontSize: 24, fontWeight: "light", color: "white" }}>Press anywhere to unlock</Text>
        </TouchableOpacity>
    )
}