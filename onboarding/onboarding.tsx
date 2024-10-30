import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useState } from "react";
import { t } from "locale";
import { SIZE } from "@/constants";
const Button = (args) => {
    const { children, title, type = "default", style, onPress } = args;

    const typeColors = {
        warning: "#f0ad4e",
        info: "#337ab7",
        disabled: "#b2f7ef",
        secondary: "#5bc0de",
        primary: "#5cb85c",
        transparent: "#ffffff"
    } as const;

    const styles = {
        backgroundColor: typeColors[type],
        padding: SIZE.SPACE.MD, // Make into constant
        borderRadius: 5,
        width: "100%",
        ...style
    };
    return (
        <TouchableOpacity
            accessible={true}
            role="button"
            style={styles}
            onPress={onPress}
            accessibilityLabel="Tap me!">
            {!!children && children}
            {!!title && <Text style={{ textAlign: "center", fontSize: 16, fontWeight: 500 }}>{title}</Text>}
        </TouchableOpacity>
    )
}
Button.propTypes = {
    // You can declare that a prop is a specific JS type. By default, these
    // are all optional.
    title: PropTypes.string,
    type: PropTypes.oneOf(['primary', 'secondary', 'info', 'disabeled', 'warning', 'transparent'] as const).isRequired,

}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
    },
    navigationWrapper: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: SIZE.SPACE.MD,
        paddingRight: SIZE.SPACE.MD,
        marginBottom: SIZE.SPACE.MD
    }
});

export default function Onboarding() {
    const [step, setStep] = useState<number>(0);
    const steps = [
        "Meet [App Name]—your secure, private notebook. Every note is encrypted end-to-end, so only you can access your thoughts and ideas. Capture, organize, and protect what matters most—all with total peace of mind."
        , "b"
        , "c"
        , "d"]

    function next() {
        step < steps.length - 1 && setStep(step + 1);
    }

    function back() {
        step > 0 && setStep(step - 1);
    }

    return (
        <View style={styles.wrapper}>
            <View style={{ paddingTop: 105 }}>
                <Text>{t("views.onboarding.stepCount", [{ name: "x", value: (step + 1).toString() }, { name: "y", value: steps.length }])}</Text>
            </View>
            <View style={{ paddingLeft: SIZE.SPACE.MD, paddingRight: SIZE.SPACE.MD, alignItems: "center" }}>
                <View style={{ marginBottom: SIZE.SPACE.LG }}>
                    <FontAwesome5 name="cat" size="150" color="black" />
                </View>
                <Text style={{ fontSize: SIZE.FONT.MD }}>{steps[step]}</Text>
            </View>
            <View style={styles.navigationWrapper}>
                <View style={{ paddingBottom: SIZE.SPACE.MD, flexDirection: "row", gap: 10 }}>
                    {steps.map((x, index: number) => {
                        return <View key={index} style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: step == index ? "black" : "lightgrey" }} />
                    })}
                </View>
                <Button title={"Next"} type="primary" onPress={next} />
                <Button title="Skip" type="transparent" onPress={back} />

            </View>
        </View>
    )
}