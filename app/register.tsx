import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "expo-router";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function RegisterScreen() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim()) {
      Alert.alert("Missing Info", "Name is required.");
      return;
    }

    try {
      setLoading(true);
      await register(email, password, name);
      Keyboard.dismiss();
      router.replace("/");
    } catch (err: any) {
      Alert.alert("Registration failed", err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-light-bg dark:bg-dark-bg flex flex-1 justify-center items-center px-10 transition-colors duration-500">
      <Animated.Text
        entering={FadeInDown.duration(500)}
        className="font-bold text-light-fg dark:text-dark-fg text-4xl mb-10 transition-colors duration-500"
      >
        Create an Account
      </Animated.Text>

      <Animated.View
        entering={FadeInDown.delay(100).duration(500)}
        className="w-full"
      >
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          className="w-full border border-modal-light-fg dark:border-modal-dark-fg p-3 rounded-md dark:placeholder:text-modal-dark-fg placeholder:text-modal-light-fg text-light-fg dark:text-dark-fg mb-5 transition-colors duration-500"
        />
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(200).duration(500)}
        className="w-full"
      >
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          className="w-full border border-modal-light-fg dark:border-modal-dark-fg p-3 rounded-md dark:placeholder:text-modal-dark-fg placeholder:text-modal-light-fg text-light-fg dark:text-dark-fg mb-5 transition-colors duration-500"
        />
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(300).duration(500)}
        className="w-full"
      >
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="w-full border border-modal-light-fg dark:border-modal-dark-fg p-3 rounded-md dark:placeholder:text-modal-dark-fg placeholder:text-modal-light-fg text-light-fg dark:text-dark-fg mb-5 transition-colors duration-500"
        />
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(400).duration(500)}
        className="w-full"
      >
        <TouchableOpacity
          className="bg-primary-light dark:bg-primary-dark flex mt-5 flex-row items-center justify-center rounded-md p-3.5 transition-colors duration-500"
          onPress={handleRegister}
        >
          <Text className="text-dark-fg font-semibold text-base transition-colors duration-500">
            {loading ? "Registering..." : "Register"}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(500).duration(500)}>
        <Text
          className="text-modal-light-fg dark:text-modal-dark-fg mt-3 transition-colors duration-500"
          onPress={() => router.push("/login")}
        >
          Already have an account? Login
        </Text>
      </Animated.View>
    </View>
  );
}
