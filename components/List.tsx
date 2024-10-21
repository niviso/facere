import { Text, View, StyleSheet } from 'react-native';
import { Store,Interaction } from"@/utilities";
import Item from "./Item";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {SIZE} from "@/constants";
import {t} from "locale";
import moment from "moment";
import { ListItem, ListViewProps } from 'types';
export default function List({data,list,setList}:ListViewProps){
    async function save(obj: Object) {
        await Store.set(data.id, obj);
      }
    
      function toggleItemComplete(value: boolean, id: string) {
        const tmpList = JSON.parse(JSON.stringify(list));
        for (let item of tmpList) {
          if (item.id == id) {
            item.complete = value;
            item.hasBeenUpdated = true;
            item.timestamp = moment().format();
            setList(tmpList);
            save(tmpList);
            return;
          }
        }
      }
    
      function deleteItem(id: string) {
        const result = list.filter((item:ListItem) => item.id !== id);
        setList(result);
        save(result);
      }
    
      function toggleImportant(id: string) {
        const tmpList = JSON.parse(JSON.stringify(list));
        for (let item of tmpList) {
          if (item.id == id) {
            item.isImportant = !item.isImportant;
            item.hasBeenUpdated = true;
            item.timestamp = moment().format();
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
        noItemsWrapper: { width: SIZE.FILL, height: 500, flex: 1, alignItems: "center", justifyContent: "center",opacity: 0.3 },
        noItemsText: { marginTop:SIZE.SPACE.MD,fontSize: SIZE.FONT.LG,fontWeight:"bold" }
      });

      return (
        <View>
            {list.map((item: any, index: number) => <Item key={`list-${item.id}`} {...item} toggleImportant={toggleImportant} onDelete={deleteItem} toggleItemComplete={toggleItemComplete} />)}
            {!list.length && <View style={styles.noItemsWrapper}><FontAwesome5 name="star" size={SIZE.ICON.LG} color="black" /><Text style={styles.noItemsText}>{t("views.list.empty")}</Text></View>}
        </View>
      );
}