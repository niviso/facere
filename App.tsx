import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState } from "react";
import { View } from "react-native";
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
  const [view, setView] = useState<ViewStateProps>({ route: ROUTES.HOME, data: {}, history: [] });
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(true);
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
