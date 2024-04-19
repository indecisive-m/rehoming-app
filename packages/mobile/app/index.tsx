import {
  Text,
  SafeAreaView,
  Button,
  Heading,
  ButtonText,
  VStack,
  ScrollView,
  Divider,
  Center,
  Card,
  Switch,
  ArrowRightIcon,
  ButtonIcon,
  Progress,
  ProgressFilledTrack,
} from "@gluestack-ui/themed";
import { Link } from "expo-router";

export default function index() {
  return (
    <SafeAreaView flex={1}>
      <ScrollView>
        <VStack space="md">
          <Center bgColor="$cyan400">
            <Heading>Rehoming App</Heading>
            <Text>Animals available to be rehomed</Text>
          </Center>
          <Link href="/home" asChild>
            <Button mx={50} rounded="$full" bgColor="$fuchsia400">
              <ButtonText>hello</ButtonText>
              <ButtonIcon as={ArrowRightIcon} />
            </Button>
          </Link>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
