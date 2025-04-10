import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = "" }: SkeletonProps) {
  const pulse = useSharedValue(0.3);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: pulse.value,
    };
  });

  // Trigger the pulsing animation
  React.useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, {
        duration: 700,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  return (
    <Animated.View
      style={animatedStyle}
      className={`bg-modal-light-bg dark:bg-modal-dark-bg rounded-md ${className}`}
    />
  );
}
