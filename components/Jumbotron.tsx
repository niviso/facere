import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState, useRef } from "react";
import * as Haptics from 'expo-haptics';

export default function Jumbotron({ onSubmit }: any) {
    const inputRef = useRef<any>(null);
    const [input, onInput] = useState("");
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState("Todo list");

    function _onSubmit(e) {
        onSubmit(input);
        onInput("");
        setTimeout(() => {
            inputRef.current?.focus();
        }, 1
        );
        e.preventDefault();
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        )
    }

    function toggleEdit() {
        if (edit) {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            )
            setEdit(false);
        } else {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
            )
            setEdit(true);
        }
    }

    //Credits for image: https://commons.wikimedia.org/wiki/File:Alto%27s_Adventure_animation_-_01_Chasm.gif
    return (
        <View style={{ position: "relative" }}>
            <Image style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} resizeMode="stretch" source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Alto%27s_Adventure_animation_-_01_Chasm.gif" }} />
            <View style={{ padding: 10,paddingTop: 70, width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <TouchableOpacity onLongPress={toggleEdit} style={{ backgroundColor: "rgba(255,255,255,0.7)",padding: 5,paddingLeft: 20,paddingRight: 20, borderRadius: 10 }}>
                    {!edit && <Text style={{ fontSize: 24 }}>{name}</Text>}
                    {edit && <TextInput autoFocus style={{ fontSize: 24 }} value={name} onChangeText={setName} onSubmitEditing={toggleEdit} />}
                </TouchableOpacity>
                <TextInput
                    style={{
                        height: 40,
                        padding: 10,
                        borderRadius: 10,
                        width: "100%",
                        marginTop: 20,
                        backgroundColor: "rgba(255,255,255,0.9)",
                    }}
                    ref={inputRef}
                    onSubmitEditing={_onSubmit}
                    onChangeText={onInput}
                    value={input}
                    placeholder="Add todo..."
                    placeholderTextColor="rgba(0,0,0,0.7)"
                />
            </View>
        </View>
    )
}