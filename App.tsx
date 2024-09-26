import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {useState} from "react";
import {View} from "react-native";
import Router from "./views";
import { StatusBar } from 'expo-status-bar';
import 'moment/locale/sv'  // without this line it didn't work
import moment from "moment";
import {getLocale} from "locale";
moment.locale(getLocale());

export default function App() {
  const [view,setView] = useState<any>({route: "Settings",data:{}});
  /*
  add to info.plist
  <key>NSFaceIDUsageDescription</key>
  <string>Allow $(PRODUCT_NAME) to use FaceID</string>
  */
  function updateView(route:string,data:any){
    setView({route: route,data:data});
  }

  return (
    <GestureHandlerRootView>
      <StatusBar style="dark" />
      {Router.map((Component:any,index:number) => {
          if(Component.name == view.route){
          return <View key={index}><Component view={view} setView={updateView} data={view.data} /></View>
          }
      })}
    </GestureHandlerRootView>
  );
}
