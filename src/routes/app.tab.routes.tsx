import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Navigator, Screen } = createBottomTabNavigator();

import { AppStackRoutes } from "./app.stack.routes";

import { Home } from "../screens/Home";
import { MyCars } from "../screens/MyCars";



export function AppTabRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Home"
        >

            <Screen
                name="AppStackRoutes"
                component={AppStackRoutes}
            />

            <Screen
                name="MyCars"
                component={MyCars}
            />

            <Screen
                name="Profile"
                component={Home}
            />


        </Navigator>
    )
}