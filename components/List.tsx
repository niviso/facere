import { Text, View, ScrollView } from 'react-native';
import Store from "../store";
import { useState, useEffect } from "react";
import Jumbotron from "./Jumbotron";
import {Item} from "./Item";
import * as Haptics from 'expo-haptics';

export default function List({setView,data}:any){
    async function save(obj: any) {
        await Store.set(data.id, obj);
      }
    
      async function fetchList() {
        const result = await Store.get(data.id);
        if (result) {
          setList(result);
        }
      }

      async function updateList(name){
        let result = await Store.get("lists");
        for (let list of result) {
            if (list.id == data.id) {
              list.name = name;
              list.hasBeenUpdated = true;
              list.timestamp = new Date();
            }
          }
          await Store.set("lists",result);
      }
    
      const [list, setList] = useState<any>([]);
      useEffect(() => {
        fetchList();
      }, []);
    
      function toggleItemComplete(value: boolean, id: string) {
        const tmpList = JSON.parse(JSON.stringify(list));
        for (let item of tmpList) {
          if (item.id == id) {
            item.complete = value;
            item.hasBeenUpdated = true;
            item.timestamp = new Date();
          }
        }
        setList(tmpList);
        save(tmpList);
      }
    
      function deleteItem(id: string) {
        const tmpList = JSON.parse(JSON.stringify(list));
        const result = tmpList.filter((item) => item.id !== id);
        setList(result);
        save(result);
      }
    
      function toggleImportant(id: string) {
        const tmpList = JSON.parse(JSON.stringify(list));
        for (let item of tmpList) {
          if (item.id == id) {
            item.isImportant = !item.isImportant;
            item.hasBeenUpdated = true;
            item.timestamp = new Date();
            if (item.isImportant) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
            } else {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
            }
          }
        }
        setList(tmpList);
        save(tmpList);
      }
    
    
      function onSubmit(input: string) {
        const newId = Date.now().toString(36) + Math.random().toString(36).substring(2);
        const newList = [{ id: newId, text: input, timestamp: new Date(), complete: false, hasBeenUpdated: false, isImportant: false }, ...list];
        setList(newList);
        save(newList);
      }
    
      return (
        <View>
          <Jumbotron headline={data.name} onSubmit={onSubmit} onUpdateHeadline={updateList} leftBtnAction={() => setView("Home")} />
          <ScrollView style={{ width: "100%" }}>
            {list.map((item: any, index: number) => <Item key={`list-${index}`} {...item} toggleImportant={toggleImportant} onDelete={deleteItem} toggleItemComplete={toggleItemComplete} />)}
            {!list.length && <View style={{ width: "100%", height: 200, flex: 1, alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: 30, opacity: 0.3 }}>:/ Empty list</Text></View>}
          <Text>{JSON.stringify(data)}</Text>
          </ScrollView>
        </View>
      );
}