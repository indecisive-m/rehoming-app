import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"; // Optional if you want to use default theme
import { Slot, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <Slot />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}
