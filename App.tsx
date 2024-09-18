import Store from "./store";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {useState,useRef,useEffect} from "react";
import {Animated} from "react-native";
import Router from "./views";
export default function App() {
  const [view,setView] = useState<any>({route: "Home",data:{}});
  const fadeAnim = useRef(new Animated.Value(-2000)).current;

  function updateView(route:string,data:any){
    Animated.timing(fadeAnim, {
      toValue: 2000,
      duration: 500,
      useNativeDriver: true,
    }).start();

  setTimeout(() => {
    setView({route: route,data:data});
  },525);
  }

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: -2000,
      duration: 5,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  },10);
  })
  return (
    <GestureHandlerRootView>

      {Router.map((Component:any,index:number) => {
          if(Component.name == view.route){
          return <Animated.View key={index} style={{transform: [{translateY: fadeAnim}],}}><Component setView={updateView} data={view.data} /></Animated.View>
          }
      })}
    </GestureHandlerRootView>
  );
}
