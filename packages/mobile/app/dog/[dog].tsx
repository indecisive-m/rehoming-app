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
  View,
} from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import getASingleDog from "../utils/getASingleDog";
import { Image, ListRenderItem, useWindowDimensions } from "react-native";
import { Database } from "../constants/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const dog = () => {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
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
  ``;

  const renderedImages: ListRenderItem<string> = ({ item }) => {
    return (
      <Image source={{ uri: item }} style={{ height: width, width: width }} />
    );
  };

  const paragraph = dogDetails?.description.map((paragraph, idx) => (
    <Text size="lg" color="$textDark900" key={idx}>
      {paragraph}
    </Text>
  ));

  return (
    <LinearGradient
      colors={["rgba(240, 205, 247, 0.9)", "rgba(9, 235, 13, 0.4)"]}
      start={{ x: 0.2, y: 0.4 }}
      end={{ x: 1, y: 1 }}
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={dogDetails?.images}
            mb={10}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={renderedImages}
          />
          <VStack space="lg" p={20}>
            <Heading size="2xl" color="$textDark950">
              {dogDetails?.name}
            </Heading>
            {paragraph}

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
      </View>
    </LinearGradient>
  );
};

export default dog;
