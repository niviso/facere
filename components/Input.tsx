import { useState, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { COLOR, SIZE } from "@/constants";
import {InputProps } from "@/types";

export default function Input({ value, placeholder, onSubmitEditing, onChangeText, style, autoFocus, refocus }: InputProps) {
    const [input, setInput] = useState<string>(value || "");
    const inputRef = useRef<TextInput>(null);
    function update(inputStr: string) {
        setInput(inputStr);
        onChangeText && onChangeText(inputStr);

    }
    function submit() {
        onSubmitEditing && onSubmitEditing(input);
        setInput("");
        if (refocus) {
            setTimeout(() => {
                inputRef.current && inputRef.current.focus();
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
                onChangeText={(e:string) => update(e)}
                onSubmitEditing={submit}
                placeholderTextColor={COLOR.BLACK}
            />
        </View>
    )
}