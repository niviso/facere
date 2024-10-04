import { useState, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { COLOR, SIZE } from "@/constants";
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
        if (refocus) {
            setTimeout(() => {
                inputRef.current.focus();
            }, 1);
        }
    }

    const styles = StyleSheet.create({
        input: {
            height: 44,
            paddingLeft: SIZE.SPACE.MD,
            borderRadius: SIZE.SPACE.MD,
            backgroundColor: COLOR.BORDER_COLOR,
        },
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
                placeholderTextColor={COLOR.BLACK}
            />
        </View>
    )
}