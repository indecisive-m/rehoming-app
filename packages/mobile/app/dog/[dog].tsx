import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import {
  Heading,
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
import Loading from "../components/Loading";
import { upperCaseName } from "../utils/utils";

const dog = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [dogDetails, setDogDetails] = useState<Database>();
  const [imageHeight, setImageHeight] = useState(width);
  const [imageWidth, setImageWidth] = useState(width);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const data = getASingleDog(id);

    data.then((res) => setDogDetails(res));
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  let timeLeft = "";

  let dogName: string;
  let dogDescription = dogDetails?.description;

  if (dogDetails?.time_left === "Red") {
    timeLeft = "Red: 0-3 hours";
  } else if (dogDetails?.time_left === "Amber") {
    timeLeft = "Amber: 4 hours";
  } else {
    timeLeft = "Red/Amber: 2-4 hours";
  }
  if (dogDetails?.name !== undefined) {
    dogName = upperCaseName(dogDetails?.name);
  }

  if (dogDetails?.rescue_name === "RSPCA") {
    const nameString = dogDetails?.description.toString();
    dogDescription = nameString.split(".");
  }

  const renderedImages: ListRenderItem<string> = ({ item }) => {
    return (
      <Link
        href={{
          pathname: "/dog/fullscreenImage",
          params: { id: id },
        }}
      >
        <Image source={{ uri: item }} style={{ height: width, width: width }} />
      </Link>
    );
  };

  // Replace all multiple white Spaces with a single space.
  // Trim the ends and beginning of any white space

  const paragraph = dogDescription?.map((paragraph, idx) => (
    <Text size="lg" color="$textDark900" key={idx}>
      {paragraph.replace(/\s{2,}/g, " ").trim()}
    </Text>
  ));

  if (isLoading) {
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
        <Loading />
      </LinearGradient>
    );
  }

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
              {dogName}
            </Heading>
            {paragraph}
            <Text>{dogDetails?.rescue_name}</Text>
            <Text>
              <Text bold={true}>Fence Height Required:</Text>{" "}
              {dogDetails?.fence_height}
            </Text>
            <Text>
              <Text bold={true}>Good With Children:</Text>{" "}
              {dogDetails?.good_with_children}
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
      </View>
    </LinearGradient>
  );
};

export default dog;
