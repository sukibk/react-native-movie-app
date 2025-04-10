import { Text, View } from "react-native";
import React from "react";

import { LucideProps } from "lucide-react-native";

type TabIconProps = {
  icon: React.FC<LucideProps>;
  label: string;
  size?: number;
  color?: string;
  focused: boolean;
};

export default function TabIcon({
  icon: Icon,
  label,
  size,
  color,
  focused,
}: TabIconProps) {
  return (
    <View
      className={`flex w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center transition-colors duration-500
      ${
        focused
          ? "bg-primary-light dark:bg-primary-dark flex-row rounded-full gap-2 overflow-hidden"
          : "bg-transparent"
      }
    `}
    >
      <Icon size={size} color={color} />
      {focused && <Text className="text-white font-bold">{label}</Text>}
    </View>
  );
}
