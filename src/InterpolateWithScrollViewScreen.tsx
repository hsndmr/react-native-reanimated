import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

interface PageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const SIZE = width * 0.7;

const Page = (props: PageProps) => {
  const { title, index, translateX } = props;

  const inputRange = [(-index - 1) * width, index * width, (index + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(translateX.value, inputRange, [0, 1, 0]);

    const borderRadius = interpolate(translateX.value, inputRange, [
      0,
      SIZE / 2,
      0,
    ]);

    return {
      borderRadius,
      transform: [
        {
          scale,
        },
      ],
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <View
      style={{
        height,
        width,
        backgroundColor: `rgba(128, 0, 128, 0.${index + 2})`,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View
        style={[
          {
            position: "absolute",
          },
          rTextStyle,
        ]}
      >
        <Text
          style={[
            {
              fontSize: 80,
              color: "white",
            },
          ]}
        >
          {title}
        </Text>
      </Animated.View>
    </View>
  );
};

const WORDS = ["Hello", "World", "React Native", "is", "awesome"];

export default function InterpolateWithScrollViewScreen() {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });
  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      horizontal
      style={styles.container}
    >
      {WORDS.map((title, index) => {
        return (
          <Page
            key={index.toString()}
            title={title}
            index={index}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "rgba(128, 0, 128, 1)",
  },
});
