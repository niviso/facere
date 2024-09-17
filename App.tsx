import { Text, View, ScrollView } from 'react-native';
import Store from "./store";
import { useState,useEffect } from "react";
import { Item, Jumbotron } from "./components";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {

  async function save(data:any) {
    await Store.set("listData", data);
  }

  async function fetchList() {
    const data = await Store.get("listData");
    if(data) {
      setList(data);
    }

  }

  const [list, setList] = useState<any>([]);
  useEffect(() => {
    fetchList();
  },[]);

  function toggleItemComplete(value: boolean, id: string) {
    const tmpList = JSON.parse(JSON.stringify(list));
    for (let item of tmpList) 
    { 
      if (item.id == id) { 
        item.complete = value;
        item.hasBeenUpdated = true;
        item.timestamp = new Date();
      } 
    }
     setList(tmpList);
     save(tmpList);
  }
  

  function onSubmit(input: string) {
    const newId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    const newList = [{ id: newId, text: input, timestamp: new Date(), complete: false,hasBeenUpdated:false }, ...list];
    setList(newList);
    save(newList);
  }

  return (
    <GestureHandlerRootView>
      <Jumbotron onSubmit={onSubmit} />
      <ScrollView style={{ width: "100%" }}>
        {list.map((item: any, index: number) => <Item key={`list-${index}`} {...item} toggleItemComplete={toggleItemComplete} />)}
        {!list.length && <View style={{ width: "100%", height: 200, flex: 1, alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: 30, opacity: 0.3 }}>:/ Empty list</Text></View>}
      </ScrollView>
    </GestureHandlerRootView>
  );
}
