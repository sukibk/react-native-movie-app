import { View, Text } from "react-native";
import React from "react";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

export default function MovieInfo({ label, value }: MovieInfoProps) {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-light-fg dark:text-dark-fg font-norma text-sm mb-2 transition-colors duration-500">
        {label}
      </Text>
      <Text className="text-modal-light-fg dark:text-modal-dark-fg font-norma text-sm transition-colors duration-500">
        {value || "N/A"}
      </Text>
    </View>
  );
}
