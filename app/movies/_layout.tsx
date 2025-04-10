import { Stack } from "expo-router";
import React from "react";

export default function MoviesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          gestureEnabled: true,
          headerShown: false,
        }}
      />
    </Stack>
  );
}
