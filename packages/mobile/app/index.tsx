import {
  Text,
  SafeAreaView,
  Heading,
  VStack,
  ScrollView,
  Center,
  FlatList,
} from "@gluestack-ui/themed";
import { useState } from "react";
import DogCard from "./components/DogCard";
import getDetails from "./utils/getDetails";

export default function index() {
  const [dogDetails, setDogDetails] = useState([]);

  const data = getDetails();

  data.then((res) => setDogDetails(res));

  return (
    <SafeAreaView flex={1}>
      <ScrollView>
        <VStack space="md">
          <Center bgColor="$cyan400" mb={10} py={10}>
            <Heading>Rehoming App</Heading>
            <Text>Animals available to be rehomed</Text>
          </Center>
        </VStack>
      </ScrollView>
      <FlatList
        data={dogDetails}
        style={{ padding: 10 }}
        renderItem={({ item }) => <DogCard item={item} />}
        keyExtractor={(item) => item.website_url}
      />
    </SafeAreaView>
  );
}
