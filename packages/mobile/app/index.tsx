import {
  Text,
  SafeAreaView,
  Button,
  Heading,
  ButtonText,
  VStack,
  ScrollView,
  Center,
  ArrowRightIcon,
  ButtonIcon,
} from "@gluestack-ui/themed";
import { Link } from "expo-router";
import DogCard from "./components/DogCard";
import { supabase } from "./utils/supabaseClient";

export default function index() {
  const fetchDetails = async () => {
    const { data, error } = await supabase.from("dog").select();
  };

  fetchDetails();

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
        <DogCard />
      </ScrollView>
    </SafeAreaView>
  );
}
