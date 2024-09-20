import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import moment from 'moment';
import Store from "../store";
import { Card, NavigationBar } from "../components";
import { useState, useEffect } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

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
        const newId = Date.now().toString(36) + Math.random().toString(36).substring(2);
        const obj = { id: newId, name: `New List ${lists.length + 1}`, timestamp: new Date() };
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


    return (
        <View style={styles.wrapper}>
            <NavigationBar headline={view.route} leftBtn={{ text: "Create list", onPress: createList }}>
            <View style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 15 }}>
                <TextInput
                    style={{
                        height: 40,
                        padding: 15,
                        borderRadius: 15,
                        width: "100%",
                        backgroundColor: "rgba(0,0,0,0.1)",
                    }}
                    placeholder="Search"
                    placeholderTextColor="rgba(0,0,0,0.7)"
                />
            </View>
            </NavigationBar>
            <ScrollView>
                {
                    search.length == 0 && lists.map((list: any) => {
                        return (<Card key={list.id} id={list.id} eyebrow={moment(list.timestamp).fromNow()} text={list.name} onPress={() => setView('SelectedList', list)} cta={<Ionicons name="chevron-forward" size={20} color="rgba(0,0,0,0.8)" />
                        } />)
                    })}
                {
                    search.length !== 0 && lists.map((list: any) => {
                        return search.toLowerCase().includes(list.name.toLowerCase()) && (<Card key={list.id} id={list.id} eyebrow={moment(list.timestamp).fromNow()} text={list.name} onPress={() => setView('SelectedList', list)} cta={<AntDesign name="right" size={16} color="black" />} />)
                    })}
            </ScrollView>
        </View>
    )
}