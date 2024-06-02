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
import Animated, {
  interpolate,
  runOnJS,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const dog = () => {
  const queryClient = useQueryClient();
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [imageHeight, setImageHeight] = useState(width);

  const image = useSharedValue(width);
  const scale = useSharedValue(1);

  const pinch = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = event.scale;
    })
    .onEnd(() => {
      scale.value = withTiming(1);
    });

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

  const makeImgFullScreen = () => {
    image.value = withTiming(height, { duration: 400 });
    setImageHeight(height);
  };

  const makeImgSmall = () => {
    image.value = withTiming(width, { duration: 400 }, () => {
      runOnJS(setImageHeight)(width);
    });
  };

  const imageAnimationStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const pressableAnimationStyle = useAnimatedStyle(() => ({
    opacity: interpolate(image.value, [height, width], [1, 0]),
  }));

  const RenderedImages: ListRenderItem<string> = ({ item, index }) => {
    return (
      <View position="relative">
        <Pressable onPress={() => makeImgFullScreen()}>
          <Animated.Image
            source={{ uri: item }}
            style={[
              {
                height: image,
                width: width,
                objectFit: imageHeight === width ? "cover" : "contain",
              },
              imageAnimationStyle,
            ]}
          />
        </Pressable>
      </View>
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        position="relative"
        scrollEnabled={imageHeight === width ? true : false}
      >
        {imageHeight === width ? null : (
          <AnimatedPressable
            onPress={() => makeImgSmall()}
            style={[
              {
                zIndex: 10,
                position: "absolute",
                top: insets.top + 10,
                right: insets.right + 10,
              },
              pressableAnimationStyle,
            ]}
          >
            <AntDesign name="closecircle" size={32} color="black" />
          </AnimatedPressable>
        )}
        <GestureDetector gesture={pinch}>
          <FlatList
            data={data?.images}
            mb={10}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={RenderedImages}
          />
        </GestureDetector>

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
