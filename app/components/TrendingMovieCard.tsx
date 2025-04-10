import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { FC } from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import RankingGradient from "@/assets/images/rankingGradient.png";
import DarkRankingGradient from "@/assets/images/dark-gradient.png";
import Animated from "react-native-reanimated";

type TrendingMovieProps = {
  movie: TrendingMovie;
  index: number;
  darkStyle: { opacity: number };
  lightStyle: { opacity: number };
};

const TrendingMovieCard: FC<TrendingMovieProps> = ({
  movie,
  index,
  darkStyle,
  lightStyle,
}) => {
  return (
    <Link href={`/movies/${movie?.movie_id}`} asChild>
      <TouchableOpacity className="w-40 relative pl-5">
        <Image
          source={{ uri: movie.poster_url }}
          className={"w-40 h-60 rounded-lg"}
          resizeMode="cover"
        />
        <View className="absolute bottom-4 -left-3.5 px-2 py rounded-full">
          <MaskedView
            maskElement={
              <Text className="font-bold text-light-fg dark:text-dark-fg text-7xl">
                {index + 1}
              </Text>
            }
          >
            <View style={{ width: 56, height: 72 }}>
              <Animated.Image
                source={RankingGradient}
                resizeMode="contain"
                style={[StyleSheet.absoluteFillObject, lightStyle]}
              />
              <Animated.Image
                source={DarkRankingGradient}
                resizeMode="contain"
                style={[StyleSheet.absoluteFillObject, darkStyle]}
              />
            </View>
          </MaskedView>
        </View>
        <Text
          className="text-sm font-bold mt-2 text-gray-500"
          numberOfLines={2}
        >
          {movie.title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingMovieCard;
