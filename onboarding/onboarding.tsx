import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {useState} from "react";
const Button = (args) => {
    const {children,title,type="default",style, onClick} = args;

    const typeColors = {
        warning: "#f0ad4e",
        info: "#337ab7",
        disabled: "#b2f7ef",
        secondary: "#5bc0de",
        primary: "#5cb85c",
        transparent: "#ffffff"
    } as const;

    const styles= {
        backgroundColor:typeColors[type],
        padding: 12, // Make into constant
        borderRadius: 5,
        width: "100%",
        ...style
    };
    return (
        <TouchableOpacity
            accessible={true}
            role="button"
            style={styles}
            onPress={onClick}
            accessibilityLabel="Tap me!">
            {!!children && children}
            {!!title && <Text style={{textAlign: "center", fontSize: 16, fontWeight: 500}}>{title}</Text>}
        </TouchableOpacity>
    )
}
Button.propTypes = {
    // You can declare that a prop is a specific JS type. By default, these
    // are all optional.
    title: PropTypes.string,
    type: PropTypes.oneOf(['primary', 'secondary', 'info', 'disabeled','warning','transparent'] as const).isRequired,

}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent:"space-between",
        flexDirection:"column",
    },
    navigationWrapper:{
        width: "100%",
        justifyContent: "center",
        alignItems:"center",
        paddingLeft: 25,
        paddingRight: 25,
        marginBottom: 25
    }
});

export default function Onboarding() {
    const [step,setStep] = useState<number>(0);
    const steps = ["a","b","c","d"]

    return (
        <View style={styles.wrapper}>
            <View style={{paddingTop: 105}}>
                <Text>Page 3 of 5</Text>
            </View>
            <View>
            <FontAwesome5 name="lock" size="100" color="lightgrey" />
                <Text>{steps[step]}</Text></View>
            <View style={styles.navigationWrapper}>
            <View style={{paddingBottom: 15, flexDirection:"row",gap:10}}>
                {steps.map((x,index:number) => {
                    return <View key={index} style={{width:10,height:10,borderRadius:10,backgroundColor: step == index ? "black" : "lightgrey"}}/>
                })}
            </View>
            <Button title="Next" type="primary" onClick={() => setStep(step+1)}/>
            <Button title="Skip" type="transparent" onClick={() => setStep(step-1)}/>

            </View>
        </View>
    )
}