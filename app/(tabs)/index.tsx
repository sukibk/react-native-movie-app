import {
  Image,
  Text,
  ScrollView,
  useColorScheme,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import Fade from "@/assets/images/hero-fade1.png";
import Logo from "@/assets/images/logo.png";
import LogoLight from "@/assets/images/logo-light.png";
import SearchBar from "@/app/components/SearchBar";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeInDown,
  FadeIn,
  FadeInUp,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import useFetch from "../hooks/useFetch";
import { fetchMovies } from "@/app/utils/api";
import MovieCard from "../components/MovieCard";
import { getTrendingMovies } from "../utils/appwrite";
import TrendingMovieCard from "../components/TrendingMovieCard";
import Protected from "../components/Protected";
import { useAuth } from "../context/AuthContext";

export default function index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch<Movie[]>({
    fetchFunction: () => fetchMovies({ query: "" }),
    autoFetch: true,
  });

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch<TrendingMovie[]>({
    fetchFunction: () => getTrendingMovies(),
    autoFetch: true,
  });

  const colorScheme = useColorScheme();
  const darkMode = colorScheme === "dark";

  const darkOpacity = useSharedValue(darkMode ? 1 : 0);

  const { user } = useAuth();

  useEffect(() => {
    const timeout = setTimeout(() => {
      darkOpacity.value = withTiming(darkMode ? 1 : 0, { duration: 500 });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [darkMode]);

  const darkLogoStyle = useAnimatedStyle(() => ({
    opacity: darkOpacity.value,
  }));

  const lightLogoStyle = useAnimatedStyle(() => ({
    opacity: 1 - darkOpacity.value,
  }));

  // Make sure to always put transition-colors duration-500 on all components for smoother UI transition
  return (
    <Protected>
      <View className="flex-1 bg-light-bg dark:bg-dark-bg transition-colors duration-500">
        {darkMode && (
          <Image
            source={Fade}
            className="absolute w-full z-0 opacity-[2%] rotate-180 top-[-150]"
          />
        )}
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            minHeight: "100%",
            paddingBottom: 10,
          }}
        >
          <View className="pt-[6rem]">
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
          {(moviesLoading || trendingMoviesLoading) && (
            <ActivityIndicator
              size="large"
              color={!darkMode ? "#9485ff" : "#412be4"}
              className="mt-10 self-center"
            />
          )}
          {(moviesError || trendingMoviesError) && (
            <Text className="text-white">
              Error: {moviesError?.message || trendingMoviesError?.message}
            </Text>
          )}
          {trendingMovies && (
            <Animated.View
              entering={FadeInDown.delay(300).duration(600)}
              className="mt-10"
            >
              <Text className="text-light-fg dark:text-dark-fg text-lg font-bold mt-5 mb-3">
                Trending Movies
              </Text>
              <FlatList
                data={trendingMovies}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="w-8"></View>}
                className="mb-2 mt-3 px-3 "
                renderItem={({ item, index }) => (
                  <TrendingMovieCard
                    movie={item}
                    index={index}
                    darkStyle={lightLogoStyle}
                    lightStyle={darkLogoStyle}
                  />
                )}
                keyExtractor={(item) => item.movie_id.toString()}
              />
            </Animated.View>
          )}
          <Animated.View entering={FadeInDown.delay(500).duration(600)}>
            <Text className="text-light-fg dark:text-dark-fg text-lg font-bold mt-5 mb-3">
              Latest Movies
            </Text>
            <FlatList
              data={movies}
              renderItem={({ item }) => <MovieCard movie={item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32 "
              scrollEnabled={false}
            />
          </Animated.View>
        </ScrollView>
      </View>
    </Protected>
  );
}
