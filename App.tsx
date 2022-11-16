import React from "react";
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';

import { ThemeProvider } from "styled-components";
import { AppProvider } from "./src/hooks";



import { Routes } from "./src/routes";

import theme from "./src/styles/theme";


LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state'
]);


export function App() {

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });

  if (!fontsLoaded) {
    return (
      <AppLoading />
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </GestureHandlerRootView>

    </ThemeProvider>
  )
}