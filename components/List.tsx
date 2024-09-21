import { Text, View } from 'react-native';
import Store from "../store";
import {Item} from "./Item";
import * as Haptics from 'expo-haptics';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {Size} from "@/constants";
export default function List({data,list,setList}:any){
    async function save(obj: any) {
        await Store.set(data.id, obj);
      }
    
      function toggleItemComplete(value: boolean, id: string) {
        const tmpList = JSON.parse(JSON.stringify(list));
        for (let item of tmpList) {
          if (item.id == id) {
            item.complete = value;
            item.hasBeenUpdated = true;
            item.timestamp = new Date();
            setList(tmpList);
            save(tmpList);
            return;
          }
        }
      }
    
      function deleteItem(id: string) {
        const result = list.filter((item:any) => item.id !== id);
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
    
      return (
        <View>
            {list.map((item: any, index: number) => <Item key={`list-${index}`} {...item} toggleImportant={toggleImportant} onDelete={deleteItem} toggleItemComplete={toggleItemComplete} />)}
            {!list.length && <View style={{ width: "100%", height: 500, flex: 1, alignItems: "center", justifyContent: "center",opacity: 0.3 }}><FontAwesome5 name="star" size={Size.Icon.lg} color="black" /><Text style={{ marginTop:20,fontSize: 24,fontWeight:"bold" }}>Empty list</Text></View>}
        </View>
      );
}