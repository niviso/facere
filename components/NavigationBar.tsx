import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
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
    headlineElement?: any;
    headlineText?: string;
    children: ReactElement;
}
export default function NavigationBar({ leftBtn, rightBtn, headlineElement,headlineText,children }: NavBarProps) {
    const windowWidth = Dimensions.get('window').width;
    const styles = StyleSheet.create({
        wrapper: {
            paddingBottom: 15,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 120,
            paddingTop: 70
        },
        topWrapper:{
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 15,
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
            fontWeight: "bold",
            maxWidth: windowWidth - 230 // 200 + 30 padding
        },
        actionBtnText: {
            fontSize: 16
        }
    });
    return (
        <View style={styles.topWrapper}>
            <View style={styles.wrapper}>
                {rightBtn &&
                    <TouchableOpacity onPress={rightBtn.onPress} style={styles.rightBtnWrapper}>
                        {rightBtn.icon && <Ionicons name={rightBtn.icon} size={18} color="rgba(0,0,0,0.8)" style={{paddingRight: 5}} />}
                        <Text style={styles.actionBtnText}>{rightBtn.text}</Text>
                    </TouchableOpacity>
                }
                {headlineText && !headlineElement &&  <Text numberOfLines={1} style={styles.headlineText}>{headlineText}</Text>}
                {headlineElement && <View style={styles.headlineText}>{headlineElement}</View>}

                {leftBtn &&
                    <TouchableOpacity onPress={leftBtn.onPress} style={styles.leftBtnWrapper}>
                        <Text style={styles.actionBtnText}>{leftBtn.text}</Text>
                        {leftBtn.icon && <Ionicons name={leftBtn.icon} size={18} color="rgba(0,0,0,0.8)" style={{paddingLeft: 5}} />}
                    </TouchableOpacity>
                }
            </View>
            {children}
        </View>
    )
}