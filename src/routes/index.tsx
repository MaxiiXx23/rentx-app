import React from "react";
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from "../hooks/auth";

import { AuthRoutes } from "./auth.routes";
import { AppTabRoutes } from "./app.tab.routes";
import { LoadAnimated } from "../components/LoadAnimated";

export function Routes() {

    const { user, loading } = useAuth();

    return (
        loading ? <LoadAnimated /> :
            <NavigationContainer>
                {user.id ? <AppTabRoutes /> : <AuthRoutes />}
            </NavigationContainer>
    )
}