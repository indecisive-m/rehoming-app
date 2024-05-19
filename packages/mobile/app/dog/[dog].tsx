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
import { AntDesign } from "@expo/vector-icons";

import { Image, ListRenderItem, useWindowDimensions } from "react-native";
import Loading from "../components/Loading";
import { upperCaseName } from "../utils/utils";
import * as WebBrowser from "expo-web-browser";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const dog = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [makeFullSize, setMakeFullSize] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const insets = useSafeAreaInsets();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["dog", id],
    queryFn: () => getASingleDog(id),
  });

  const openWebsiteLink = async () => {
    const open = await WebBrowser.openBrowserAsync(data?.website_url);
  };

  let timeLeft = "";

  let dogName: string;
  let dogDescription = data?.description;

  if (data?.time_left === "Red") {
    timeLeft = "Red: 0-3 hours";
  } else if (data?.time_left === "Amber") {
    timeLeft = "Amber: 4 hours";
  } else {
    timeLeft = "Red/Amber: 2-4 hours";
  }
  if (data?.name !== undefined) {
    dogName = upperCaseName(data?.name);
  }

  if (data?.rescue_name === "RSPCA") {
    const nameString = data?.description.toString();
    dogDescription = nameString.split(".");
  }

  const onClick = (index: number) => {
    setSelectedIndex(index);
    setMakeFullSize(true);
  };

  const RenderedImages: ListRenderItem<string> = ({ item, index }) => {
    return (
      <Pressable onPress={() => onClick(index)}>
        <Image source={{ uri: item }} style={{ height: width, width: width }} />
      </Pressable>
    );
  };

  const ZoomedImage = ({ item, index }) => {
    return (
      <Pressable onLongPress={() => {}}>
        <Image
          source={{ uri: item }}
          style={{ height: "100%", width: width, objectFit: "contain" }}
        />
      </Pressable>
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

  if (makeFullSize) {
    return (
      <LinearGradient
        colors={["rgba(240, 205, 247, 0.9)", "rgba(9, 235, 13, 0.4)"]}
        start={{ x: 0.2, y: 0.4 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: "100%",

          position: "relative",
        }}
      >
        <Pressable onPress={() => setMakeFullSize(false)}>
          <AntDesign
            name="closecircle"
            size={24}
            color="black"
            style={{
              position: "absolute",
              top: insets.top,
              right: 30,
              zIndex: 10,
            }}
          />
        </Pressable>
        <FlatList
          data={data?.images}
          mb={10}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={selectedIndex}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          renderItem={ZoomedImage}
        />
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={data?.images}
          mb={10}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={RenderedImages}
        />
        <VStack space="lg" p={20}>
          <Heading size="2xl" color="$textDark950">
            {dogName}
          </Heading>
          {paragraph}
          <Text>{data?.rescue_name}</Text>
          <Text>
            <Text bold={true}>Fence Height Required:</Text> {data?.fence_height}
          </Text>
          <Text>
            <Text bold={true}>Good With Children:</Text>{" "}
            {data?.good_with_children}
          </Text>

          <Text>
            <Text bold={true}>Age:</Text> {data?.age}
          </Text>
          <Text>
            <Text bold={true}>Sex: </Text>
            {data?.sex}
          </Text>
          <Text>
            <Text bold={true}>Breed: </Text>
            {data?.breed}
          </Text>
          <Text>
            <Text bold={true}>Current Location: </Text>
            {data?.location}
          </Text>
          <Text>
            <Text bold={true}>Time Able To Be Left: </Text>
            {timeLeft}
          </Text>
          <Text>{data?.reserved}</Text>
          <Pressable onPress={() => openWebsiteLink()}>
            <Text>See on Website</Text>
          </Pressable>
          <Pressable onPress={() => router.back()}>
            <Heading>Go Back</Heading>
          </Pressable>
        </VStack>
      </ScrollView>
    </LinearGradient>
  );
};

export default dog;
