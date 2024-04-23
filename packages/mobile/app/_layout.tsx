import { GluestackUIProvider } from "@gluestack-ui/themed";
import { Slot } from "expo-router";
import { config } from "@gluestack-ui/config"; // Optional if you want to use default theme

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Slot />
    </GluestackUIProvider>
  );
}
