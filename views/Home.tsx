import { View, ScrollView, StyleSheet } from 'react-native';
import moment from 'moment';
import { Store, Interaction } from "@/utilities";
import { Card, NavigationBar, Input } from "@/components";
import { useState, useEffect } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import {SIZE, COLOR, ROUTES} from "@/constants";
import {t} from "locale";
import * as Crypto from 'expo-crypto';
import type { RouteProps,ListProps,SelectedListProps } from "@/types";

export default function Home({ setView, view, data }: RouteProps) {
    const [lists, setLists] = useState<SelectedListProps[]>([]);
    const [search, setSearch] = useState<string>("");

    async function save(obj: Object):Promise<void>  {
        await Store.set("lists", obj);
    }

    async function fetchList():Promise<void> {
        const result = await Store.get("lists") as SelectedListProps;
        if (result) {
            setLists(result);
        }
    }

    function createList():void {
        const newList:SelectedListProps = { id: Crypto.randomUUID(), name: `New List ${lists.length + 1}`, timeStamp:moment().format() };
        let result = [...lists, newList];
        setLists(result);
        save(result);
        Interaction.success();
        setView(ROUTES.SELECTED_LIST, newList);
        
    }

    useEffect(() => {
        fetchList();
    }, []);
    
    const styles = StyleSheet.create({
        container: {
            width: SIZE.FILL,
            padding: SIZE.SPACE.SM,
            borderBottomWidth: 1,
            borderColor: COLOR.BORDER_COLOR,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: COLOR.WHITE
        },
        innerContainer: {
            display: "flex",
            flexDirection: "column",
            width: "80%",
            gap: SIZE.SPACE.XS
        },
        baseText: {
            fontSize: SIZE.FONT.MD,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            textDecorationLine: "line-through",
        },
        topText: {
            fontSize: SIZE.FONT.MD,
            opacity: 0.5
        },
        wrapper: {
            width: SIZE.FILL, height: SIZE.FILL
        },
    });
    function onDelete(id:string):void {
        const result = lists.filter((item:SelectedListProps) => item.id !== id);
        setLists(result);
        save(result);
        Store.delete(id);
    }

    function goToList(list:SelectedListProps):void {
        Interaction.on();
        setView('SelectedList', list)
    }

    function goToSettings():void {
        setView(ROUTES.SETTINGS);
    }

    return (
        <View style={styles.wrapper}>
            <NavigationBar headlineText={t("views.home.name")} rightBtn={{ text: t("views.home.settings"), onPress: goToSettings }} leftBtn={{ text: t("views.home.create"), onPress: createList }}>
                <Input placeholder={t("views.home.searchPlaceholder")} onChangeText={setSearch} />
            </NavigationBar>
            <ScrollView>
                {
                    search.length == 0 && lists.length > 0 && lists.map((list: SelectedListProps) => {
                        return (<Card onDelete={onDelete} key={list.id} id={list.id} eyebrow={moment(list.timeStamp).fromNow()} text={list.name} onPress={() => goToList(list)} cta={<Ionicons name="chevron-forward" size={SIZE.ICON.MD} color={COLOR.BLACK} />
                        } />)
                    })}
                {
                    search.length !== 0 && lists.length > 0 && lists.map((list: SelectedListProps) => {
                        return list.name.toLowerCase().includes(search.toLowerCase()) && (<Card onDelete={onDelete} key={list.id} id={list.id} eyebrow={moment(list.timeStamp).fromNow()} text={list.name} onPress={() => goToList(list)} cta={<AntDesign name="right" size={SIZE.ICON.MD} color={COLOR.BLACK} />} />)
                    })}
            </ScrollView>
        </View>
    )
}