import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {useState} from "react";
import {View} from "react-native";
import Router from "./views";
import { StatusBar } from 'expo-status-bar';
import 'moment/locale/sv'  // without this line it didn't work
import moment from "moment";
import {getLocale} from "locale";
import type {ViewStateProps} from "@/types";
moment.locale(getLocale());

export default function App() {
  const [view,setView] = useState<ViewStateProps>({route: "Home",data:{}});
  /*
  add to info.plist
  <key>NSFaceIDUsageDescription</key>
  <string>Allow $(PRODUCT_NAME) to use FaceID</string>
  */
  function updateView(route:string,data:Record<string , unknown>){
    setView({route: route,data:data});
  }

  return (
    <GestureHandlerRootView>
      <StatusBar style="dark" />
      {Router.map((Component:any,index:number) => { // I AM SORRY
          if(Component.name == view.route){
          return <View key={index}><Component view={view} setView={updateView} data={view.data} /></View>
          }
      })}
    </GestureHandlerRootView>
  );
}
