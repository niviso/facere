import { View, ScrollView, StyleSheet } from 'react-native';
import moment from 'moment';
import { Store, Encryption } from "@/utilities";
import { Card, NavigationBar, Input } from "@/components";
import { useState, useEffect } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Size} from "@/constants";
import {COLOR} from "@/constants";
import {t} from "locale";
import * as Crypto from 'expo-crypto';
export default function Home({ setView, view, data }: any) {

    const [lists, setLists] = useState<any>([]);
    const [search, setSearch] = useState<string>("");
    async function save(obj: any) {
        await Store.set("lists", obj);
    }

    async function fetchList() {
        const result = await Store.get("lists");
        if (result) {
            setLists(result);
        }
    }

    function createList() {
        const obj = { id: Crypto.randomUUID(), name: `New List ${lists.length + 1}`, timestamp: new Date() };
        const result = [...lists, obj];
        setLists(result);
        save(result);
        setView("SelectedList", obj);
    }

    useEffect(() => {
        fetchList();
    }, []);
    const styles = StyleSheet.create({
        container: {
            width: "100%",
            padding: 10,
            borderBottomWidth: 1,
            borderColor: "rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "white"
        },
        innerContainer: {
            display: "flex",
            flexDirection: "column",
            width: "80%",
            gap: 5
        },
        baseText: {
            fontSize: 18,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            textDecorationLine: "line-through",
        },
        topText: {
            fontSize: 12,
            opacity: 0.5
        },
        wrapper: {
            width: "100%", height: "100%"
        },
    });
    function onDelete(id:string) {
        const result = lists.filter((item:any) => item.id !== id);
        setLists(result);
        save(result);
        Store.delete(id);
      }

    return (
        <View style={styles.wrapper}>
            <NavigationBar headlineText={view.route} leftBtn={{ text: t("views.home.create"), onPress: createList }}>
                <Input placeholder="Search" onChangeText={setSearch} />
            </NavigationBar>
            <ScrollView>
                {
                    search.length == 0 && lists.map((list: any) => {
                        return (<Card onDelete={onDelete} key={list.id} id={list.id} eyebrow={moment(list.timestamp).fromNow()} text={list.name} onPress={() => setView('SelectedList', list)} cta={<Ionicons name="chevron-forward" size={Size.Icon.md} color={COLOR.BLACK} />
                        } />)
                    })}
                {
                    search.length !== 0 && lists.map((list: any) => {
                        return list.name.toLowerCase().includes(search.toLowerCase()) && (<Card onDelete={onDelete} key={list.id} id={list.id} eyebrow={moment(list.timestamp).fromNow()} text={list.name} onPress={() => setView('SelectedList', list)} cta={<AntDesign name="right" size={Size.Icon.md} color="black" />} />)
                    })}
            </ScrollView>
        </View>
    )
}