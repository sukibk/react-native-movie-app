import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { User as UserIcon, LogOut } from "lucide-react-native";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <View className="bg-light-bg dark:bg-dark-bg flex-1 transition-colors duration-500 justify-between pb-10">
      {/* Header */}
      <View className="pt-[6rem] px-10">
        <Animated.Text
          entering={FadeInDown.duration(600)}
          className="text-light-fg dark:text-dark-fg transition-colors duration-500 font-bold text-3xl"
        >
          Welcome back,
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(100).duration(600)}
          className="text-primary-light dark:text-primary-dark text-5xl font-extrabold mt-2 transition-colors duration-500"
        >
          {user?.name || "User"}
        </Animated.Text>
      </View>

      {/* User Info */}
      <View className="flex items-center mt-10">
        <Animated.View
          entering={FadeInDown.delay(200).duration(600)}
          className="w-24 h-24 rounded-full bg-primary-light dark:bg-primary-dark items-center justify-center"
        >
          <UserIcon size={48} color="#fff" />
        </Animated.View>

        <Animated.Text
          entering={FadeInDown.delay(300).duration(600)}
          className="text-light-fg dark:text-dark-fg text-lg mt-5 transition-colors duration-500"
        >
          {user?.email}
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(400).duration(600)}
          className="text-modal-light-fg dark:text-modal-dark-fg text-xs mt-1"
        >
          ID: {user?.$id.slice(0, 10)}...
        </Animated.Text>
      </View>

      {/* Logout Button */}
      <Animated.View
        entering={FadeInDown.delay(500).duration(600)}
        className="px-10"
      >
        <TouchableOpacity
          onPress={async () => {
            await logout();
            router.replace("/login");
          }}
          className="bg-primary-light dark:bg-primary-dark flex flex-row items-center justify-center gap-2 rounded-md py-4 transition-colors duration-500 mb-20"
        >
          <LogOut color="#fff" />
          <Text className="text-dark-fg font-semibold text-base">Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
