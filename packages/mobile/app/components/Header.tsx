import {
  Center,
  Heading,
  VStack,
  Text,
  HStack,
  Icon,
} from "@gluestack-ui/themed";
import { FontAwesome6 } from "@expo/vector-icons";

export default function Header() {
  return (
    <VStack space="sm" my={20}>
      <HStack alignItems="center" space="4xl" justifyContent="center" px={20}>
        <Heading size="3xl">FIND A PET</Heading>
        <FontAwesome6 name="filter" size={24} color="black" />
      </HStack>
      <Center>
        <Text size="sm">Dogs in need of a new home</Text>
      </Center>
    </VStack>
  );
}
