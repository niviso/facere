import { Store, Interaction } from "@/utilities";
import { List, NavigationBar, Input } from "@/components";
import { useState, useEffect, ReactElement } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { t } from "locale";
import * as Crypto from 'expo-crypto';
import type { RouteProps, ListItem,ListProps } from "@/types";
import { SIZE,ROUTES } from "@/constants";
import moment from "moment";
export default function SelectedList({ setView, data }: RouteProps) {
  const [list, setList] = useState<ListItem[] | null[]>([]);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>(data.name);

  async function fetchList(): Promise<void> {
    const result:ListItem[] = await Store.get(data.id) as ListItem[];
    if (result) {
      setList(result);
    }
  }


  useEffect(() => {
    fetchList();
  }, []);

  async function onSubmitNewItem(input: string) {
    const newListItem: ListItem[] = [{ id: Crypto.randomUUID(), text: input, timestamp: moment().format(), complete: false, hasBeenUpdated: false, isImportant: false }, ...list as ListItem[]];
    setList(newListItem);
    Interaction.on();
    await Store.set(data.id, newListItem);
  }
  async function updateList(name: string): Promise<void> {
    let result = await Store.get("lists") as ListItem[];
    setShowEdit(false);
    for (let list of result) {
      if (list.id == data.id) {
        list.name = name;
        list.timeStamp = moment().format();
        setName(name);
        toggleEdit();
      }
    }
    await Store.set("lists", result);
  }

  function toggleEdit(): void {
    if (showEdit) {
      Interaction.on();
      setShowEdit(false);
    } else {
      Interaction.off();
      setShowEdit(true);
    }
  }

  const HeadlineElement = (): ReactElement => {
    return (
      !showEdit ? <TouchableOpacity onLongPress={toggleEdit}><Text numberOfLines={1} style={{ fontSize: SIZE.FONT.MD, fontWeight: "bold" }}>{name}</Text></TouchableOpacity> :
        <Input style={{ fontSize: SIZE.FONT.MD, fontWeight: "bold" }} value={name} onSubmitEditing={updateList} autoFocus />
    )
  }

  function goBack(): void {
    Interaction.success();
    setView(ROUTES.HOME);
  }
  return (
    <ScrollView style={{ width: SIZE.FILL }}>
      <NavigationBar headlineElement={<HeadlineElement />} rightBtn={{ text: t("views.selectedList.back"), icon: "chevron-back", onPress: goBack }} leftBtn={{ text: showEdit ? t("views.selectedList.cancel") : t("views.selectedList.edit"), onPress: toggleEdit }}>
        <Input refocus={true} onSubmitEditing={onSubmitNewItem} placeholder={t("views.selectedList.add_placeholder")} />
      </NavigationBar>
      <List data={data} setList={setList} list={list} />
    </ScrollView>
  )
}