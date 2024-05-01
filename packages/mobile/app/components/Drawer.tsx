import { Pressable, Text } from "@gluestack-ui/themed";
import { useWindowDimensions } from "react-native";
import Animated, {
  FadeInLeft,
  SlideInLeft,
  SlideOutLeft,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Drawer({ showDrawer, setShowDrawer, setColumnView }) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  return (
    <Animated.View
      style={[
        {
          height: height,
          backgroundColor: "white",
          width: "70%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          paddingTop: insets.top,
          paddingHorizontal: 20,
        },
      ]}
      entering={FadeInLeft}
      exiting={SlideOutLeft}
    >
      <Pressable
        alignItems="flex-end"
        py={20}
        onPress={() => setShowDrawer(false)}
      >
        <Text>Close</Text>
      </Pressable>
      <Text>hello</Text>
      <Pressable onPress={() => setColumnView((prev) => !prev)}>
        <Text>View mode</Text>
      </Pressable>
    </Animated.View>
  );
}

// 4 tasks to go:

// Appointment 5hrs 56

// shoulder massage 5hrs 56

// discuss nursery plans 4hrs 2

// discuss colour scheme 2hrs 8
