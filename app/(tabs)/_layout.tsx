import React, { useState, useEffect } from "react";
import { Tabs } from "expo-router";
import { Download, House, Search, UserCog } from "lucide-react-native";
import TabIcon from "@/app/components/TabIcon";
import { useColorScheme } from "react-native";
import {
  useSharedValue,
  withTiming,
  interpolateColor,
  useAnimatedReaction,
  runOnJS,
} from "react-native-reanimated";

export default function _layout() {
  const colorScheme = useColorScheme();

  const progress = useSharedValue(colorScheme === "dark" ? 1 : 0);
  const [tabColor, setTabColor] = useState("#e4e1ff");

  useAnimatedReaction(
    () => progress.value,
    (val) => {
      const interpolated = interpolateColor(
        val,
        [0, 1],
        ["#e4e1ff", "#2f2b50"]
      );
      runOnJS(setTabColor)(interpolated);
    },
    [progress]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      progress.value = withTiming(colorScheme === "dark" ? 1 : 0, {
        duration: 500,
      });
    }, 1000);

    return () => clearTimeout(timeout); // optional cleanup
  }, [colorScheme]);

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: tabColor,
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: tabColor,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={House}
              label="Home"
              size={24}
              color={focused ? "white" : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={Search}
              label="Search"
              size={24}
              color={focused ? "white" : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={Download}
              label="Saved"
              size={24}
              color={focused ? "white" : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={UserCog}
              label="Profile"
              size={24}
              color={focused ? "white" : "gray"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
