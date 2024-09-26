import { Store, Interaction } from "@/utilities";
import { List, NavigationBar,Input } from "@/components";
import { useState, useEffect } from "react";
import { ScrollView, Text,TouchableOpacity } from "react-native";
import {t} from "locale";
import * as Crypto from 'expo-crypto';

export default function SelectedList({ setView, data }: any) {
  const [list, setList] = useState<any>([]);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>(data.name);
  
  async function fetchList() {
    const result = await Store.get(data.id);
    if (result) {
      setList(result);
    }
  }


  useEffect(() => {
    fetchList();
  }, []);

  async function onSubmitNewItem(input: string) {
    const newListItem = [{ id: Crypto.randomUUID(), text: input, timestamp: new Date(), complete: false, hasBeenUpdated: false, isImportant: false }, ...list];
    setList(newListItem);
    await Store.set(data.id, newListItem);
  }
  async function updateList(name: string) {
    let result = await Store.get("lists");
    setShowEdit(false);
    for (let list of result) {
      if (list.id == data.id) {
        list.name = name;
        list.hasBeenUpdated = true;
        list.timestamp = new Date();
        setName(name);
        toggleEdit();
      }
    }
    await Store.set("lists", result);
  }

  function toggleEdit() {
    if (showEdit) {
      Interaction.on();
      setShowEdit(false);
    } else {
      Interaction.off();
      setShowEdit(true);
    }
  }

  const HeadlineElement = () => {
    return (
      !showEdit ? <TouchableOpacity onLongPress={toggleEdit}><Text numberOfLines={1} style={{ fontSize: 22,fontWeight:"bold" }}>{name}</Text></TouchableOpacity> :
        <Input style={{ fontSize: 22,fontWeight:"bold" }} value={name} onSubmitEditing={updateList} autoFocus />
    )
  }

  function goBack() {
    Interaction.success();
    setView("Home");
  }
  return (
    <ScrollView style={{ width: "100%" }}>
      <NavigationBar headlineElement={<HeadlineElement />} rightBtn={{ text: t("views.selectedLists.back"), icon: "chevron-back", onPress: goBack }} leftBtn={{ text: showEdit ? t("views.selectedLists.cancel") : t("views.selectedLists.edit"), onPress: toggleEdit }}>
        <Input refocus={true} onSubmitEditing={onSubmitNewItem} placeholder="Add todo" />
      </NavigationBar>
      <List data={data} setList={setList} list={list} />
    </ScrollView>
  )
}