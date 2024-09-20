import Store from "../store";
import {Jumbotron, List} from "../components";
import {useState} from "react";
import {ScrollView} from "react-native";
export default function SelectedList({setView,data}:any){
    const [list, setList] = useState<any>([]);
    async function onSubmitNewItem(input: string) {
        const newId = Date.now().toString(36) + Math.random().toString(36).substring(2);
        const newListItem = [{ id: newId, text: input, timestamp: new Date(), complete: false, hasBeenUpdated: false, isImportant: false }, ...list];
        setList(newListItem);
        await Store.set(data.id, newListItem);
    }
    async function updateList(name:string){
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
    return (
        <ScrollView style={{ width: "100%" }}>
            <Jumbotron headline={data.name} onSubmit={onSubmitNewItem} onUpdateHeadline={updateList} leftBtnAction={() => setView("Home")} />
            <List data={data} setList={setList} list={list}/>
        </ScrollView>
    )
}