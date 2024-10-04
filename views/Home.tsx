import { View, ScrollView, StyleSheet } from 'react-native';
import moment from 'moment';
import { Store, Interaction } from "@/utilities";
import { Card, NavigationBar, Input } from "@/components";
import { useState, useEffect } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import {SIZE, COLOR} from "@/constants";
import {t} from "locale";
import * as Crypto from 'expo-crypto';
import type { ListItemProps, RouteProps } from "@/types";

export default function Home({ setView, view, data }: RouteProps) {
    const [lists, setLists] = useState<any>([]);
    const [search, setSearch] = useState<string>("");

    async function save(obj: any) {
        await Store.set("lists", obj);
    }

    async function fetchList() {
        const result = await Store.get("lists");
        console.log(result);
        if (result) {
            setLists(result);
        }
    }

    function createList() {
        const newList = { id: Crypto.randomUUID(), name: `New List ${lists.length + 1}`, timestamp:moment().format() };
        let result = [...lists, newList];
        setLists(result);
        save(result);
        Interaction.success();
        setView("SelectedList", newList);
        
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
    function onDelete(id:string) {
        const result = lists.filter((item:any) => item.id !== id);
        setLists(result);
        save(result);
        Store.delete(id);
    }

    function goToList(list:ListItemProps) {
        Interaction.on();
        setView('SelectedList', list)

    }

    return (
        <View style={styles.wrapper}>
            <NavigationBar headlineText={view.route} rightBtn={{ text: t("views.home.settings"), onPress: ()=>setView("Settings") }} leftBtn={{ text: t("views.home.create"), onPress: createList }}>
                <Input placeholder="Search" onChangeText={setSearch} />
            </NavigationBar>
            <ScrollView>
                {
                    search.length == 0 && lists.length > 0 && lists.map((list: any) => {
                        return (<Card onDelete={onDelete} key={list.id} id={list.id} eyebrow={moment(list.timestamp).fromNow()} text={list.name} onPress={() => goToList(list)} cta={<Ionicons name="chevron-forward" size={SIZE.ICON.MD} color={COLOR.BLACK} />
                        } />)
                    })}
                {
                    search.length !== 0 && lists.length > 0 && lists.map((list: any) => {
                        return list.name.toLowerCase().includes(search.toLowerCase()) && (<Card onDelete={onDelete} key={list.id} id={list.id} eyebrow={moment(list.timestamp).fromNow()} text={list.name} onPress={() => goToList(list)} cta={<AntDesign name="right" size={SIZE.ICON.MD} color="black" />} />)
                    })}
            </ScrollView>
        </View>
    )
}