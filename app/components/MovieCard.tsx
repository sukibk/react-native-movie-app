import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { FC } from "react";
import { Link } from "expo-router";
import { Star } from "lucide-react-native";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link href={`/movies/${movie?.id}`} asChild>
      <TouchableOpacity className="w-[30%] transition-colors duration-500">
        <Image
          source={{
            uri: movie?.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff/png?text=n/a",
          }}
          className="w-full h-52 rounded-md"
          resizeMode="cover"
          alt={movie?.title}
        />
        <Text
          className="text-sm font-bold text-light-fg dark:text-dark-fg mt-2"
          numberOfLines={1}
        >
          {movie?.title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1">
          <Star size={16} color="#FFD700" />
          <Text className="text-light-fg dark:text-dark-fg text-xs font-bold">
            {Math.round(movie.vote_average / 2)}
          </Text>
        </View>
        <View className="flex-row item-center justify-between">
          <Text className="text-xs text-gray-500 font-medium">
            {movie.release_date?.split("-")[0]}
          </Text>
          {/* <Text className="text-xs text-gray-500 font-medium">MOVIE</Text> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
