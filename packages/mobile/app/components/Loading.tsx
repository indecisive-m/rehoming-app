import { View, Text, ViewProps, ViewStyle } from "react-native";
import React, { useState, useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withRepeat,
  withDelay,
  withTiming,
  Easing,
  interpolateColor,
  runOnUI,
} from "react-native-reanimated";
import { Button, ButtonText, Center } from "@gluestack-ui/themed";

const Loading = () => {
  const [repeat, setRepeat] = useState(false);
  const translate0 = useSharedValue(0);
  const translate1 = useSharedValue(0);
  const translate2 = useSharedValue(0);
  const translate3 = useSharedValue(0);
  const translate4 = useSharedValue(0);
  const translate5 = useSharedValue(0);
  const backgroundColor = useSharedValue("#fc03f0");

  const DELAY = 200;
  // the duration of the colour changes needs to be DELAY * amount of dots + 600 then divided by 3
  const DURATION = (DELAY * 6 + 600) / 3;

  useEffect(() => {
    fullAnimation();
  }, []);

  const fullAnimation = async () => {
    translateAnimation();
    backgroundColor.value = withSequence(
      withTiming("#fc03f0", {
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      }),
      withTiming("white", {
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      }),
      withTiming("#fc03f0", {
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      }),
      withTiming("white", {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      }),
      withTiming("#fc03f0", {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      })
    );
  };

  const translateAnimation = () => {
    translate0.value = withDelay(
      DELAY,
      withSequence(
        withTiming(translate0.value - 50, {
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming((translate0.value = 0), {
          easing: Easing.inOut(Easing.ease),
        })
      )
    );
    translate1.value = withDelay(
      DELAY * 2,
      withSequence(
        withTiming(translate1.value - 50, {
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming((translate1.value = 0), {
          easing: Easing.inOut(Easing.ease),
        })
      )
    );
    translate2.value = withDelay(
      DELAY * 3,
      withSequence(
        withTiming(translate2.value - 50, {
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming((translate2.value = 0), {
          easing: Easing.inOut(Easing.ease),
        })
      )
    );
    translate3.value = withDelay(
      DELAY * 4,
      withSequence(
        withTiming(translate3.value - 50, {
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming((translate3.value = 0), {
          easing: Easing.inOut(Easing.ease),
        })
      )
    );
    translate4.value = withDelay(
      DELAY * 5,
      withSequence(
        withTiming(translate4.value - 50, {
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming((translate4.value = 0), {
          easing: Easing.inOut(Easing.ease),
        })
      )
    );
    translate5.value = withDelay(
      DELAY * 6,
      withSequence(
        withTiming(translate5.value - 50, {
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming((translate5.value = 0), {
          easing: Easing.inOut(Easing.ease),
        })
      )
    );
  };

  const $circle: ViewStyle = {
    height: 10,
    width: 10,
    backgroundColor: "black",
    borderRadius: 500,
  };

  return (
    <Center>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Animated.View
          style={[
            $circle,
            {
              transform: [{ translateY: translate0 }],
              backgroundColor: backgroundColor,
            },
          ]}
        />
        <Animated.View
          style={[
            $circle,
            {
              transform: [{ translateY: translate1 }],
              backgroundColor: backgroundColor,
            },
          ]}
        />
        <Animated.View
          style={[
            $circle,
            {
              transform: [{ translateY: translate2 }],
              backgroundColor: backgroundColor,
            },
          ]}
        />
        <Animated.View
          style={[
            $circle,
            {
              transform: [{ translateY: translate3 }],
              backgroundColor: backgroundColor,
            },
          ]}
        />
        <Animated.View
          style={[
            $circle,
            {
              transform: [{ translateY: translate4 }],
              backgroundColor: backgroundColor,
            },
          ]}
        />
        <Animated.View
          style={[
            $circle,
            {
              transform: [{ translateY: translate5 }],
              backgroundColor: backgroundColor,
            },
          ]}
        />
      </View>
    </Center>
  );
};

export default Loading;
