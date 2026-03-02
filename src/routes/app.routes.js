import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppContext } from "../context/AppContext";
import StudentHome from "../views/StudentHome";
import AdminHome from "../views/AdminHome";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  const { user } = useContext(AppContext);

  return (
    <Stack.Navigator>
      {user?.role === "admin" ? (
        <Stack.Screen
          name="AdminHome"
          component={AdminHome}
          options={{ title: "ADM - Cantina do Tio João" }}
        />
      ) : (
        <Stack.Screen
          name="StudentHome"
          component={StudentHome}
          options={{ title: "Aluno - Cantina do Tio João" }}
        />
      )}
    </Stack.Navigator>
  );
}
