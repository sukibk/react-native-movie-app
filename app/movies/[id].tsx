import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import useFetch from "../hooks/useFetch";
import { fetchMovieDetails } from "../utils/api";
import { ArrowLeft, Star } from "lucide-react-native";
import MovieInfo from "../components/MovieInfo";
import Skeleton from "../components/Skeleton";
import { Heart } from "lucide-react-native";
import { useAuth } from "../context/AuthContext";
import { addFavorite, removeFavorite, getFavorite } from "../utils/appwrite";

const MovieDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch<MovieDetails>({
    fetchFunction: () => fetchMovieDetails(id as string),
    autoFetch: true,
  });

  const { user } = useAuth();
  const [favoriteDocId, setFavoriteDocId] = useState<string | null>(null);

  // Check if movie is already favorited
  useEffect(() => {
    if (user && movie?.id) {
      getFavorite(user.$id, movie.id).then((doc) => {
        setFavoriteDocId(doc?.$id ?? null);
      });
    }
  }, [user, movie]);

  const toggleFavorite = async () => {
    if (!user || !movie) return;

    console.log("Clicking");

    if (favoriteDocId) {
      await removeFavorite(favoriteDocId);
      setFavoriteDocId(null);
    } else {
      try {
        console.log("entering else");
        const doc = await addFavorite(user.$id, movie);
        console.log("Added to favorites:", JSON.stringify(doc));
        setFavoriteDocId(doc.$id);
      } catch (error) {
        console.error("❌ Failed to add favorite:", error);
      }
    }
  };

  return (
    <View className="bg-light-bg dark:bg-dark-bg flex-1 transition-colors duration-500">
      <ScrollView
        className="flex"
        contentContainerStyle={{ justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        {!loading ? (
          <Animated.Image
            entering={FadeIn.duration(800)}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
            }}
            className="w-screen h-[500px] rounded-md"
            resizeMode="stretch"
          />
        ) : (
          <Skeleton className="w-screen h-[500px]" />
        )}

        <Animated.View
          entering={FadeInDown.delay(100).duration(600)}
          className="flex-col items-start justify-center mt-5 px-5 pb-[7rem]"
        >
          <Text className="text-light-fg dark:text-dark-fg font-bold text-xl transition-colors duration-500">
            {movie?.title}
          </Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <Heart
              size={26}
              color={favoriteDocId ? "red" : "gray"}
              fill={favoriteDocId ? "red" : "transparent"}
            />
          </TouchableOpacity>

          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-modal-light-fg dark:text-modal-dark-fg text-sm transition-colors duration-500">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-modal-light-fg dark:text-modal-dark-fg text-sm transition-colors duration-500">
              {movie?.runtime}m
            </Text>
          </View>

          <View className="flex-row items-center bg-modal-light-bg dark:bg-modal-dark-bg px-2 py-1 rounded-md gap-x-1 mt-2 transition-colors duration-500">
            <Star size={16} color="#FFD700" />
            <Text className="text-light-fg dark:text-dark-fg font-bold text-sm transition-colors duration-500">
              {Math.round(movie?.vote_average ?? 0)} / 10
            </Text>
            <Text className="text-modal-light-fg dark:text-modal-dark-fg text-sm transition-colors duration-500">
              ({movie?.vote_count}) votes
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={
              movie?.genres?.map((genre) => genre.name).join(" | ") || "N/A"
            }
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${
                movie?.budget
                  ? `${Math.round(movie?.budget / 1_000_000)} million`
                  : "N/A"
              }`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${
                movie?.revenue
                  ? `${Math.round(movie?.revenue / 1_000_000)} million`
                  : "N/A"
              }`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                ?.map((company) => company.name)
                .join(" | ") || "N/A"
            }
          />
        </Animated.View>
      </ScrollView>

      <Animated.View
        entering={FadeInDown.delay(600).duration(600)}
        className="absolute bottom-5 left-0 right-0 mx-10 mb-3"
      >
        <TouchableOpacity
          className="bg-primary-light dark:bg-primary-dark flex flex-row items-center justify-center z-50 rounded-md py-3.5 transition-colors duration-500"
          onPress={router.back}
        >
          <ArrowLeft color="white" />
          <Text className="text-dark-fg font-semibold text-base pl-2 transition-colors duration-500">
            Go Back
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default MovieDetails;
export const options = {
  gestureEnabled: true,
  headerShown: false,
};
