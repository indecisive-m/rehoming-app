import {
  Heading,
  Pressable,
  Text,
  ScrollView,
  VStack,
  FlatList,
  View,
} from "@gluestack-ui/themed";
import { Stack, router, useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "react-native";

import React, { useState } from "react";
import { ListRenderItem, useWindowDimensions } from "react-native";
import getASingleDog from "../utils/getASingleDog";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const fullscreenImage = () => {
  const { id } = useLocalSearchParams();
  const [dogImages, setDogImages] = useState();
  const [pressed, setPressed] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const data = getASingleDog(id);

  data.then((res) => setDogImages(res.images));

  const { width, height } = useWindowDimensions();

  const renderedImages: ListRenderItem<string> = ({ item }) => (
    <Pressable onPress={() => {}}>
      <Image
        source={{ uri: item }}
        style={[
          {
            height: height,
            width: width,
            objectFit: "contain",
          },
          pressed ? { transform: [{ scale: 2 }] } : null,
        ]}
      />
    </Pressable>
  );

  return (
    <LinearGradient
      colors={["rgba(240, 205, 247, 0.9)", "rgba(9, 235, 13, 0.4)"]}
      start={{ x: 0.2, y: 0.4 }}
      end={{ x: 1, y: 1 }}
      style={{
        height: "100%",
      }}
    >
      <View position="relative">
        <Pressable onPress={() => router.back()} style={{ zIndex: 10 }}>
          <AntDesign
            name="closecircle"
            size={24}
            color="black"
            style={{
              position: "absolute",
              top: insets.top,
              right: 30,
            }}
          />
        </Pressable>
        <FlatList
          data={dogImages}
          renderItem={renderedImages}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
        />
      </View>
    </LinearGradient>
  );
};

export default fullscreenImage;
