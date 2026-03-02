import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

export default function Routes() {
  const { user } = useContext(AppContext);

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
