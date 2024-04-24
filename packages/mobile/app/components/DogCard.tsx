import { Card, Heading, Text, VStack, View } from "@gluestack-ui/themed";
import { Link } from "expo-router";
import { Image, ListRenderItem } from "react-native";
import { Database } from "../constants/types";
import { useState } from "react";

const DogCard: ListRenderItem<Database> = ({ item }) => {
  return (
    <Link
      style={{
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 5,
      }}
      href={{
        pathname: "/dog/[dog]",
        params: { id: item.id },
      }}
    >
      <View
        p={10}
        justifyContent="center"
        alignItems="center"
        bgColor={"$backgroundDark100"}
        borderRadius={5}
      >
        <Image
          source={{ uri: item.images[0] }}
          style={{
            height: 350,
            width: 350,
            aspectRatio: 1,
            borderRadius: 5,
          }}
        />
        <View width={"100%"} px={10}>
          <Heading size="2xl" pt={10}>
            {item.name}
          </Heading>
          <Text size="sm">{item.sex.toUpperCase()}</Text>
        </View>
      </View>
    </Link>
  );
};

export default DogCard;
