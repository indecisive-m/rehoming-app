import {
  Center,
  Heading,
  VStack,
  Text,
  HStack,
  Pressable,
} from "@gluestack-ui/themed";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

export default function Header({ setShowDrawer }) {
  const navigation = useNavigation();
  return (
    <VStack space="sm" my={20}>
      <HStack alignItems="center" space="4xl" justifyContent="center" px={20}>
        <Heading size="3xl">FIND A PET</Heading>
        <Pressable onPress={() => setShowDrawer((prev) => !prev)}>
          <FontAwesome6 name="filter" size={24} color="black" />
        </Pressable>
      </HStack>
      <Center>
        <Text size="md">Dogs in need of a new home</Text>
      </Center>
    </VStack>
  );
}
