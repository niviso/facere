import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import Store from "../store";
import {useState,useEffect} from "react";
export default function Home({setView,data}:any){
    const [lists,setLists] = useState<any>([]);
    async function save(obj: any) {
        await Store.set("lists", obj);
      }
    
      async function fetchList() {
        const result = await Store.get("lists");
        if (result) {
          setLists(result);
        }
      }

      function createList(){
        const newId = Date.now().toString(36) + Math.random().toString(36).substring(2);
        const obj = {id: newId,name: "New List",timestamp: new Date()};
        const result = [...lists,obj];
        setLists(result);
        save(result);
        setView("List",obj);
      }

      useEffect(() => {
        fetchList();
      },[]);
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
        }
      });
    return (
        <>
        <View style={{ position: "relative", height: 200,backgroundColor:"orange"}}>
        <View style={{ padding: 10,paddingTop: 100, width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <Text style={{ fontSize: 24 }}>Lists</Text>
          </View>
        </View>
        <TouchableOpacity onPress={createList} style={{...styles.container,display: "flex",justifyContent:"space-between"}}>
        <Text style={{fontSize: 18}}>➕</Text>
            <Text style={{fontSize: 18}}>CREATE LIST</Text>
            <Text style={{fontSize: 18}}>➕</Text>
        </TouchableOpacity>
        {
        lists.map((list,index) => {return (
        <TouchableOpacity key={list.id} style={styles.container} onPress={() => setView('List',list)}>
          <View style={styles.innerContainer}>
            <Text style={styles.topText}>{moment(list.timestamp).fromNow()}</Text>
            <Text numberOfLines={1} style={{ width: "80%", color: "black" }}>{list.name}</Text>
          </View>
          <View>
            <Text>Open</Text>
          </View>
        </TouchableOpacity>
        )})}
        </>
    )
}