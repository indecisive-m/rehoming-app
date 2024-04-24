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
import Header from "./components/Header";
import { Database } from "./constants/types";

export default function index() {
  const [dogDetails, setDogDetails] = useState<Database[]>();

  const data = getDetails();

  data.then((res) => setDogDetails(res));

  return (
    <SafeAreaView flex={1}>
      <FlatList
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        data={dogDetails}
        ListHeaderComponent={<Header />}
        renderItem={({ item }) => <DogCard item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
