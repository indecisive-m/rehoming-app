import {
  Text,
  Box,
  SafeAreaView,
  Button,
  Heading,
  ButtonText,
  VStack,
  ScrollView,
} from "@gluestack-ui/themed";
import { Link } from "expo-router";

export default function home() {
  return (
    <SafeAreaView flex={1}>
      <Text>Hello</Text>
      <Link href="/" asChild>
        <Button>
          <ButtonText>Hello</ButtonText>
        </Button>
      </Link>
    </SafeAreaView>
  );
}
