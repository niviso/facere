import { Text, View, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import moment from 'moment';
import Store from "../store";
import {Card} from "../components";
import { useState, useEffect } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Home({ setView, data }: any) {
    const [lists, setLists] = useState<any>([]);
    const [search,setSearch] = useState<string>("");
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
        const obj = { id: newId, name: `New List ${lists.length+1}`, timestamp: new Date() };
        const result = [...lists, obj];
        setLists(result);
        save(result);
        setView("List", obj);
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
            <View style={{ position: "relative", height: 200, backgroundColor: "orange" }}>
                <View style={{ padding: 10, paddingTop: 100, width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <Text style={{ fontSize: 40, color: "white" }}>MY LISTS</Text>
                    <TextInput
                        style={{
                            height: 40,
                            padding: 10,
                            borderRadius: 10,
                            width: "100%",
                            marginTop: 20,
                            backgroundColor: "rgba(255,255,255,0.9)",
                        }}
                        onChangeText={setSearch}
                        placeholder={"🔎 Search lists..."}
                        placeholderTextColor="rgba(0,0,0,0.7)"
                    />
                </View>
            </View>
            <ScrollView>
                    {
                    search.length == 0 && lists.map((list:any) => {
                        return (<Card key={list.id} id={list.id} eyebrow={moment(list.timestamp).fromNow()} text={list.name} onPress={() => setView('List', list)} cta={<AntDesign name="right" size={16} color="black" />}/>)
                    })}
                    {
                    search.length !== 0 && lists.map((list:any) => {
                        return search.toLowerCase().includes(list.name.toLowerCase()) && (<Card key={list.id} id={list.id} eyebrow={moment(list.timestamp).fromNow()} text={list.name} onPress={() => setView('List', list)} cta={<AntDesign name="right" size={16} color="black" />}/>)
                    })}
            </ScrollView>
            <View style={{ position: "absolute", bottom: 30, right: 30 }}>
                <TouchableOpacity onPress={createList} style={{ backgroundColor: "orange", width: 100, height: 50, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10 }}>
                    <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>New list</Text>

                </TouchableOpacity>
            </View>
        </View>
    )
}