import React, { ReactNode } from "react";
import { useColorScheme, View } from "react-native";

interface ThemeWrapperProps {
  children: ReactNode;
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const rootClass = colorScheme === "dark" ? "dark flex-1" : "flex-1";

  return <View className={rootClass}>{children}</View>;
};

export default ThemeWrapper;
