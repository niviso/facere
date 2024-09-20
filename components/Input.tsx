import { useState, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
export default function Input({ value, placeholder, onSubmitEditing, onChangeText, style, autoFocus, refocus }: any) {
    const [input, setInput] = useState<string>(value);
    const inputRef = useRef(null);
    function update(inputStr: string) {
        setInput(inputStr);
        onChangeText && onChangeText(inputStr);

    }
    function submit(e) {
        onSubmitEditing(input);
        setInput("");
        setTimeout(() => {
            inputRef.current.focus();   
        },1);
    }

    const styles = StyleSheet.create({
        input: {
            height: 40,
            padding: 15,
            borderRadius: 15,
            backgroundColor: "rgba(0,0,0,0.1)",
        }
    });
    return (
        <View>
            <TextInput
                style={style ? style : styles.input}
                ref={inputRef}
                autoFocus={autoFocus}
                placeholder={placeholder}
                value={input}
                onChangeText={(e) => update(e)}
                onSubmitEditing={(e) => submit(e)}
                placeholderTextColor="rgba(0,0,0,0.7)"
            />
        </View>
    )
}