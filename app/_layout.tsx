// import { Stack } from "expo-router";
import "./global.css";
import React from "react";
import { StatusBar } from "react-native";
import { AuthProvider } from "./context/AuthContext";
import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar hidden />
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true, // ✅ This is the magic
        }}
      />
    </AuthProvider>
  );
}
