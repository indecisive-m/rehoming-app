import { HStack, Heading, Text, VStack, View } from "@gluestack-ui/themed";
import { Link } from "expo-router";
import { Image, ListRenderItem } from "react-native";
import { Database } from "../constants/types";
import { Entypo } from "@expo/vector-icons";
import { upperCaseName } from "../utils/utils";

const DogCard: ListRenderItem<Database> = ({ item }) => {
  const borderWidth = 0.75;

  const status =
    item.reserved === "I've been reserved" ? "Reserved" : item.reserved;

  const dogName = upperCaseName(item.name);

  return (
    <Link
      style={{
        marginBottom: 20,
        shadowColor: "#fc03f0",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 5,
        backgroundColor: "rgba(228, 255, 244, 0.6)",
      }}
      href={{
        pathname: "/dog/[dog]",
        params: { id: item.id },
      }}
    >
      <View p={10}>
        <View justifyContent="center" alignItems="center">
          <Image
            source={{ uri: item.images[0] }}
            style={{
              height: 350,
              width: 350,
              aspectRatio: 1,
              borderRadius: 10,
              position: "relative",
              borderWidth: borderWidth,
              borderColor: "black",
            }}
          />
          <View
            position="absolute"
            height={50}
            width={100}
            bgColor={item.reserved === "Available" ? "$lime200" : "$orange300"}
            bottom={0}
            right={0}
            justifyContent="center"
            alignItems="center"
            borderTopLeftRadius={20}
            borderBottomRightRadius={10}
            borderRightWidth={borderWidth}
            borderBottomWidth={borderWidth}
            borderRightColor={"black"}
            borderBottomColor={"black"}
          >
            <Heading>{status}</Heading>
          </View>
        </View>
        <HStack justifyContent="space-around" alignItems="center" px={20}>
          <VStack space="sm" py={10} width={"100%"} alignItems="flex-start">
            <Heading size="2xl" numberOfLines={1}>
              {dogName}
            </Heading>
            <Text size="md">{item.breed.toUpperCase()}</Text>
          </VStack>
          <Entypo name="arrow-with-circle-right" size={40} color="black" />
        </HStack>
      </View>
    </Link>
  );
};

export default DogCard;
