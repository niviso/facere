import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState, useEffect, useRef } from "react";
import { View, AppState } from "react-native";
import Router from "./views";
import { StatusBar } from 'expo-status-bar';
import 'moment/locale/sv'  // without this line it didn't work
import moment from "moment";
import { getLocale } from "locale";
import type { ViewStateProps } from "@/types";
import { ROUTES } from "@/constants";
import { Interaction } from '@/utilities';
import { OnBoarding } from "./onboarding";
moment.locale(getLocale());

export default function App() {
  const [view, setView] = useState<ViewStateProps>({ route: ROUTES.START, data: {}, history: [] });
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(true);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if(appStateVisible == "background"){
      updateView(ROUTES.START,{}); // LOCK on background
    }

  },[appStateVisible])
  /*
  add to info.plist
  <key>NSFaceIDUsageDescription</key>
  <string>Allow $(PRODUCT_NAME) to use FaceID</string>
  */
  function updateView(route: string, data: Record<string, unknown>) {
    Interaction.on();
    setView({ route: route, data: data, history: [route, ...view.history as string[]] });
  }

  function goBack(data: Record<string, unknown>): void { //Create a router object with functions in it and send to view
    Interaction.off();
    const reduceHistory: string[] = view.history.slice(0, view.history.length - 1) || [];
    setView({ route: view.history[0], data: data, history: reduceHistory });

  }

  return (
    <GestureHandlerRootView>
      <StatusBar style="dark" />
      {onboardingCompleted ? Router.map((Component: any, index: number) => { // I AM SORRY
        if (Component.name == view.route) {
          return <View key={index}><Component view={view} setView={updateView} data={view.data} /></View>
        }
      })
        :
        <OnBoarding />
      }
    </GestureHandlerRootView>
  );
}
