import { Pressable, Text } from "@gluestack-ui/themed";
import { useWindowDimensions } from "react-native";
import Animated, {
  FadeInLeft,
  SlideInLeft,
  SlideOutLeft,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Drawer({
  showDrawer,
  setShowDrawer,
  setMultiColumnView,
  multiColumnView,
  numberOfColumns,
  setNumberOfColumns,
  showAvailableDogs,
  showAllDogs,
}) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const handleDisplayLayout = () => {
    if (multiColumnView) {
      setNumberOfColumns(1);
      setMultiColumnView((prev: boolean) => !prev);
      setAsyncStorage(JSON.stringify(!multiColumnView));
    }
    if (!multiColumnView) {
      setNumberOfColumns(2);
      setMultiColumnView((prev: boolean) => !prev);
      setAsyncStorage(JSON.stringify(!multiColumnView));
    }
  };

  const setAsyncStorage = async (layout: string) => {
    try {
      console.log("async" + layout);
      await AsyncStorage.setItem("layout", layout);
    } catch (error) {
      console.log(error);
    }
  };

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
      entering={SlideInLeft}
      exiting={SlideOutLeft}
    >
      <Pressable
        alignItems="flex-end"
        py={20}
        onPress={() => setShowDrawer(false)}
      >
        <Text>Close</Text>
      </Pressable>

      <Pressable onPress={() => handleDisplayLayout()}>
        <Text>View mode</Text>
      </Pressable>
      <Pressable onPress={() => showAvailableDogs()}>
        <Text>Only Show Available Dogs</Text>
      </Pressable>
      <Pressable onPress={() => showAllDogs()}>
        <Text>Show All Dogs</Text>
      </Pressable>
    </Animated.View>
  );
}
