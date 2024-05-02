import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"; // Optional if you want to use default theme
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
export default function App() {
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

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
