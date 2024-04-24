import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  Heading,
  SafeAreaView,
  Pressable,
  Text,
  ScrollView,
  FlatList,
  VStack,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import getASingleDog from "../utils/getASingleDog";
import { Image, ListRenderItem, useWindowDimensions } from "react-native";
import { Database } from "../constants/types";

const dog = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [dogDetails, setDogDetails] = useState<Database>();

  const data = getASingleDog(id);

  data.then((res) => setDogDetails(res));

  const image = dogDetails?.images.map((image) => {
    <Image
      source={{ uri: image }}
      style={{ height: 200, width: 200 }}
      key={image}
    />;
  });

  let timeLeft = "";

  if (dogDetails?.time_left === "Red") {
    timeLeft = "Red: 0-3 hours";
  } else if (dogDetails?.time_left === "Amber") {
    timeLeft = "Amber: 4 hours";
  } else {
    timeLeft = "Red/Amber: 2-4 hours";
  }

  const renderedImages: ListRenderItem<string> = ({ item }) => {
    return (
      <Image source={{ uri: item }} style={{ height: width, width: width }} />
    );
  };

  return (
    <SafeAreaView>
      <ScrollView px={10} showsVerticalScrollIndicator={false}>
        <FlatList
          data={dogDetails?.images}
          mb={10}
          horizontal
          pagingEnabled
          renderItem={renderedImages}
        />
        <VStack space="lg">
          <Heading size="2xl">{dogDetails?.name}</Heading>

          <Text>{dogDetails?.description}</Text>
          <Text>
            <Text bold={true}>Fence Height Required:</Text>{" "}
            {dogDetails?.fence_height}
          </Text>
          <Text>
            <Text bold={true}>Good With Children:</Text>{" "}
            {dogDetails?.good_with_children}
          </Text>
          <Text>{dogDetails?.name}</Text>
          <Text>
            <Text bold={true}>Good With Cats:</Text>{" "}
            {dogDetails?.good_with_cats}
          </Text>
          <Text>
            <Text bold={true}>Good With Dogs:</Text>{" "}
            {dogDetails?.good_with_dogs}
          </Text>
          <Text>
            <Text bold={true}>Age:</Text> {dogDetails?.age}
          </Text>
          <Text>
            <Text bold={true}>Sex: </Text>
            {dogDetails?.sex}
          </Text>
          <Text>
            <Text bold={true}>Breed: </Text>
            {dogDetails?.breed}
          </Text>
          <Text>
            <Text bold={true}>Current Location: </Text>
            {dogDetails?.location}
          </Text>
          <Text>
            <Text bold={true}>Time Able To Be Left: </Text>
            {timeLeft}
          </Text>
          <Text>{dogDetails?.reserved}</Text>
          <Pressable onPress={() => router.back()}>
            <Heading>Go Back</Heading>
          </Pressable>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default dog;
