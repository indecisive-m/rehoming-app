import { GluestackUIProvider } from "@gluestack-ui/themed";
import { Slot } from "expo-router";
import { config } from "@gluestack-ui/config"; // Optional if you want to use default theme
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}
