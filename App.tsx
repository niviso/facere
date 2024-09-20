import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {useState} from "react";
import {View} from "react-native";
import Router from "./views";

export default function App() {
  const [view,setView] = useState<any>({route: "Home",data:{}});
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
      {Router.map((Component:any,index:number) => {
          if(Component.name == view.route){
          return <View key={index}><Component setView={updateView} data={view.data} /></View>
          }
      })}
    </GestureHandlerRootView>
  );
}
