import { Text, View, StyleSheet } from 'react-native';
import { Store,Interaction } from"@/utilities";
import {Item} from "./Item";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {Size} from "@/constants";
import {t} from "locale";
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
              Interaction.on();
            } else {
              Interaction.off();
            }
          }
        }
        setList(tmpList);
        save(tmpList);
      }
      
      const styles = StyleSheet.create({
        noItemsWrapper: { width: "100%", height: 500, flex: 1, alignItems: "center", justifyContent: "center",opacity: 0.3 },
        noItemsText: { marginTop:20,fontSize: 24,fontWeight:"bold" }
      });

      return (
        <View>
            {list.map((item: any, index: number) => <Item key={`list-${item.id}`} {...item} toggleImportant={toggleImportant} onDelete={deleteItem} toggleItemComplete={toggleItemComplete} />)}
            {!list.length && <View style={styles.noItemsWrapper}><FontAwesome5 name="star" size={Size.Icon.lg} color="black" /><Text style={styles.noItemsText}>{t("views.list.empty")}</Text></View>}
        </View>
      );
}