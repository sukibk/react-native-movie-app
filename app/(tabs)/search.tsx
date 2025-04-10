import {
  Text,
  View,
  Image,
  useColorScheme,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Fade from "@/assets/images/hero-fade1.png";
import Animated, { FadeIn } from "react-native-reanimated";
import MovieCard from "../components/MovieCard";
import useFetch from "../hooks/useFetch";
import { fetchMovies } from "@/app/utils/api";
import { useRouter } from "expo-router";
import SearchBar from "../components/SearchBar";
import { updateSearchCount } from "../utils/appwrite";

export default function search() {
  const router = useRouter();

  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark";

  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset: resetMovies,
  } = useFetch<Movie[]>({
    fetchFunction: () => fetchMovies({ query: searchQuery }),
    autoFetch: false,
  });

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        resetMovies();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.trim() && movies?.length && movies?.[0]) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);

  return (
    <View className="flex-1 bg-light-bg dark:bg-dark-bg transition-colors duration-500">
      {darkMode && (
        <Image
          source={Fade}
          className="mt-[-150] opacity-[2%] rotate-180 absolute"
        />
      )}
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-20 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center ">
              <SearchBar
                onPress={() => {}}
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
                placeholder="Search for movies"
              />
            </View>
            {moviesLoading && (
              <Animated.View
                entering={FadeIn.duration(600)}
                className="my-5 items-center"
              >
                <ActivityIndicator
                  size="large"
                  color={!darkMode ? "#9485ff" : "#412be4"}
                />
                <Text className="mt-2 text-light-fg dark:text-dark-fg">
                  Fetching movies...
                </Text>
              </Animated.View>
            )}
            {moviesError && (
              <Text className="text-red-500 px-5 my-3">
                {moviesError.message}
              </Text>
            )}
            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text className="text-light-fg dark:text-dark-fg text-xl font-bold mt-5 mb-2">
                  Search results for{" "}
                  <Text className="text-accent-light dark:text-accent-dark text-2xl font-bold">
                    {searchQuery}
                  </Text>
                </Text>
              )}
          </>
        }
      />
    </View>
  );
}
