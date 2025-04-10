import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import React, { useState, useCallback } from "react";
import { getFavorites } from "../utils/appwrite";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";
import Animated, {
  FadeInDown,
  LinearTransition,
} from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";

export default function Saved() {
  const { user } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark";

  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchFavorites = async () => {
        if (user) {
          setLoading(true);
          const res = await getFavorites(user.$id);
          if (isActive) setFavorites(res);
          setLoading(false);
        }
      };

      fetchFavorites();

      return () => {
        isActive = false;
      };
    }, [user])
  );

  const renderItem = ({ item }: { item: any }) => (
    <Animated.View
      layout={LinearTransition}
      entering={FadeInDown.duration(500)}
      className="w-[30%] mx-[1.5%] mb-5"
    >
      <TouchableOpacity onPress={() => router.push(`/movies/${item.movieId}`)}>
        <Image
          source={{ uri: item.posterUrl }}
          className="w-full h-44 rounded-md"
          resizeMode="cover"
        />
        <Text
          className="text-light-fg dark:text-dark-fg text-xs mt-2 font-semibold text-center"
          numberOfLines={1}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View className="flex-1 bg-light-bg dark:bg-dark-bg px-6 pt-20 transition-colors duration-500">
      <Text className="text-light-fg dark:text-dark-fg text-3xl font-bold mb-5">
        {user?.name}'s{" "}
        <Text className="text-primary-light dark:text-primary-dark">
          Favourites
        </Text>
      </Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={darkMode ? "#412be4" : "#9485ff"}
        />
      ) : favorites.length === 0 ? (
        <Text className="text-modal-light-fg dark:text-modal-dark-fg text-center mt-10">
          You haven't favorited any movies yet.
        </Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.$id}
          numColumns={3}
          contentContainerStyle={{
            paddingBottom: 100,
            paddingTop: 10,
          }}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
