import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { PageInterface } from "../../constants";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const CIRCLE_WIDTH = SCREEN_WIDTH * 0.7;

interface Props {
  page: PageInterface;
  translateX: Animated.SharedValue<number>;
  index: number;
}

const Page: React.FC<Props> = ({ page, translateX, index }) => {
  const inputRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];

  const rCircleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        {
          scale,
        },
      ],
    };
  });

  const rImageStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      translateX.value,
      inputRange,
      [0, 0, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        {
          rotate: `${progress * Math.PI}rad`,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Animated.View style={[styles.circle, rCircleStyle]} />
        <Animated.Image
          source={page.source}
          style={[styles.image, rImageStyle]}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>{page.title}</Text>
      <Text style={styles.description}>{page.description}</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  circleContainer: {
    width: CIRCLE_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 150,
    aspectRatio: 1,
  },
  image: {
    height: SCREEN_HEIGHT * 0.5,
    aspectRatio: 1,
  },
  circle: {
    width: CIRCLE_WIDTH,
    aspectRatio: 1,
    backgroundColor: "white",
    borderRadius: CIRCLE_WIDTH / 2,
    position: "absolute",
  },
  title: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 35,
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    fontSize: 14,
    color: "grey",
  },
});
