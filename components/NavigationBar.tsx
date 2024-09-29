import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ReactElement } from 'react';
import { SIZE, COLOR } from "@/constants";
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
    children?: ReactElement;
}
export default function NavigationBar({ leftBtn, rightBtn, headlineElement, headlineText, children }: NavBarProps) {
    const windowWidth = Dimensions.get('window').width;
    const styles = StyleSheet.create({
        wrapper: {
            paddingBottom: SIZE.SPACE.MD,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 120,
            paddingTop: 70
        },
        topWrapper: {
            paddingLeft: SIZE.SPACE.MD,
            paddingRight: SIZE.SPACE.MD,
            paddingBottom: SIZE.SPACE.MD,
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
            color: COLOR.BLACK,
            fontWeight: "bold",
            maxWidth: windowWidth - 230 // 200 + 30 padding
        },
        actionBtnText: {
            fontSize: SIZE.FONT.MD,
            color: COLOR.INFO
        },
        rightIconPadding: { paddingRight: 5 },
        leftIconPadding: { paddingRight: 5 },
    });
    return (
        <View style={styles.topWrapper}>
            <View style={styles.wrapper}>
                {rightBtn &&
                    <TouchableOpacity role="button" onPress={rightBtn.onPress} style={styles.rightBtnWrapper}>
                        {rightBtn.icon && <Ionicons name={rightBtn.icon} size={rightBtn.text ? SIZE.ICON.MD : SIZE.ICON.LG} color={COLOR.INFO} style={styles.rightIconPadding} />}
                        <Text style={styles.actionBtnText}>{rightBtn.text}</Text>
                    </TouchableOpacity>
                }
                {headlineText && !headlineElement && <Text numberOfLines={1} style={styles.headlineText}>{headlineText}</Text>}
                {headlineElement && <View style={styles.headlineText}>{headlineElement}</View>}

                {leftBtn &&
                    <TouchableOpacity role="button" onPress={leftBtn.onPress} style={styles.leftBtnWrapper}>
                        {leftBtn.icon && <Ionicons name={leftBtn.icon} size={leftBtn.text ? SIZE.ICON.MD : SIZE.ICON.LG} color={COLOR.INFO} style={styles.leftIconPadding} />}
                        <Text style={styles.actionBtnText}>{leftBtn.text}</Text>
                    </TouchableOpacity>
                }
            </View>
            {children}
        </View>
    )
}