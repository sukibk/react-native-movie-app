import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "expo-router";
import React from "react";

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    Keyboard.dismiss();

    setLoading(true);
    try {
      await login(email, password);
      router.replace("/");
    } catch (err: any) {
      Alert.alert("Login failed", err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-light-bg dark:bg-dark-bg flex flex-1 justify-center items-center px-10 transition-colors duration-500">
      <Animated.Text
        className="font-bold text-light-fg dark:text-dark-fg text-4xl mb-10 transition-colors duration-500"
        entering={FadeInDown.delay(100).duration(600)}
      >
        Welcome to Movie App
      </Animated.Text>

      <Animated.View
        entering={FadeInDown.delay(200).duration(600)}
        className="w-full"
      >
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          className="w-full border border-modal-light-fg dark:border-modal-dark-fg p-3
          rounded-md dark:placeholder:text-modal-dark-fg placeholder:text-modal-light-fg text-light-fg dark:text-dark-fg
          mb-5 transition-colors duration-500"
        />
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(300).duration(600)}
        className="w-full"
      >
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="w-full border border-modal-light-fg dark:border-modal-dark-fg p-3
          rounded-md dark:placeholder:text-modal-dark-fg placeholder:text-modal-light-fg text-light-fg dark:text-dark-fg
          mb-5 transition-colors duration-500"
        />
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(400).duration(600)}
        className="w-full"
      >
        {loading ? (
          <ActivityIndicator size="large" color="#9485ff" className="mt-5" />
        ) : (
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-primary-light dark:bg-primary-dark flex mt-5 flex-row items-center justify-center rounded-md p-3.5 transition-colors duration-500"
          >
            <Text className="text-dark-fg font-semibold text-base transition-colors duration-500">
              Login
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(500).duration(600)}>
        <Text
          className="text-modal-light-fg dark:text-modal-dark-fg mt-3 transition-colors duration-500"
          onPress={() => router.push("/register")}
        >
          Don’t have an account? Register
        </Text>
      </Animated.View>
    </View>
  );
}
