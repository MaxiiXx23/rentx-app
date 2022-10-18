import React, {useEffect} from "react";
import * as SplashScreen from 'expo-splash-screen';
import { 
  useFonts, 
  Inter_400Regular ,
  Inter_500Medium
} from '@expo-google-fonts/inter';
import { 
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';

import { ThemeProvider } from "styled-components";



import { Home } from "./src/screens/Home";

import theme from "./src/styles/theme";

SplashScreen.preventAutoHideAsync();


export function App (){

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });

  async function hideSplashScreen(){
    if(fontsLoaded){
      await SplashScreen.hideAsync();
    }
  }

  useEffect(() => {
    hideSplashScreen();
  }, [fontsLoaded])

  return(
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  )
}