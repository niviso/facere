import Store from "../store";
import { List, NavigationBar } from "../components";
import { useState, useEffect } from "react";
import { ScrollView, View, TextInput,Modal,StyleSheet,Text,Button } from "react-native";

function PrefilledPrompt({ visible, defaultValue, onSubmit, onCancel }:any) {
  const [inputValue, setInputValue] = useState(defaultValue);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 15,
      margin: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    promptText: {
      fontSize: 16,
      marginBottom: 15,
      fontWeight: "bold"
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      width: "100%",
      padding: 10,
      borderRadius: 5,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    rowContainer: {
      display: "flex",
      gap: 15,
      flexDirection: "row",
      alignItems:"center",
      flexWrap: "wrap"
    },
    rowText: {
      fontSize: 16
    }
  });
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.promptText}>List settings</Text>
          <View style={styles.rowContainer}>
          <Text style={styles.rowText}>Name</Text>
          <TextInput
            style={styles.input}
            value={inputValue}
            autoFocus={true}
            onChangeText={(text) => setInputValue(text)}
          />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onCancel} />
            <Button title="Submit" onPress={() => onSubmit(inputValue)} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function SelectedList({ setView, data }: any) {
  const [list, setList] = useState<any>([]);
  const [showEdit,setShowEdit] = useState<boolean>(false);
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
    const newId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    const newListItem = [{ id: newId, text: input, timestamp: new Date(), complete: false, hasBeenUpdated: false, isImportant: false }, ...list];
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
      }
    }
    await Store.set("lists", result);
  }


  return (
    <ScrollView style={{ width: "100%" }}>
      <NavigationBar headline={data.name} rightBtn={{ text: "Go back", icon: "chevron-back-outline", onPress: () => setView("Home") }} leftBtn={{ text: "Edit", onPress: () => setShowEdit(true) }}>
        <View style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 15 }}>
          <TextInput
            style={{
              height: 40,
              padding: 15,
              borderRadius: 15,
              backgroundColor: "rgba(0,0,0,0.1)",
            }}
            placeholder="Add todo"
            placeholderTextColor="rgba(0,0,0,0.7)"
          />
        </View>
      </NavigationBar>
      <List data={data} setList={setList} list={list} />
      <PrefilledPrompt visible={showEdit} defaultValue={data.name} onSubmit={updateList} onCancel={() => setShowEdit(false)} />
    </ScrollView>
  )
}