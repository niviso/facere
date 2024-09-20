import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ReactElement } from 'react';

interface ActionButton {
    onPress: Function;
    text: string;
    icon?: string;
}

interface NavBarProps {
    leftBtn?: ActionButton | any;
    rightBtn?: ActionButton | any;
    headline: string;
    children: ReactElement;
}
export default function NavigationBar({ leftBtn, rightBtn, headline,children }: NavBarProps) {
    const styles = StyleSheet.create({
        wrapper: {
            height: 120,
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 70,
            paddingBottom: 15,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        rightBtnWrapper: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: 100,
        },
        leftBtnWrapper: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            width: 100
        },
        headlineText: {
            textAlign: "center",
            fontSize: leftBtn && rightBtn ? 22 : 32,
            color: "black",
            fontWeight: "bold"
        },
        actionBtnText: {
            fontSize: 16
        }
    });
    return (
        <View>
            <View style={styles.wrapper}>
                {rightBtn &&
                    <TouchableOpacity onPress={rightBtn.onPress} style={styles.rightBtnWrapper}>
                        {rightBtn.icon && <Ionicons name={rightBtn.icon} size={20} color="rgba(0,0,0,0.8)" />}
                        <Text style={styles.actionBtnText}>{rightBtn.text}</Text>
                    </TouchableOpacity>
                }
                <Text style={styles.headlineText}>{headline}</Text>
                {leftBtn &&
                    <TouchableOpacity onPress={leftBtn.onPress} style={styles.leftBtnWrapper}>
                        <Text style={styles.actionBtnText}>{leftBtn.text}</Text>
                        {leftBtn.icon && <Ionicons name={leftBtn.icon} size={20} color="rgba(0,0,0,0.8)" />}
                    </TouchableOpacity>
                }
            </View>
            {children}
        </View>
    )
}