import { Center, Heading, Text, View, Pressable } from "@gluestack-ui/themed";
import { Link } from "expo-router";
import {
  Image,
  ListRenderItem,
  ListRenderItemInfo,
  useWindowDimensions,
} from "react-native";
import { Database } from "../constants/types";

const MultiColumnDogCard: ListRenderItem<Database> = ({ item }) => {
  const borderWidth = 0.75;
  const MARGIN = 20;
  const { width } = useWindowDimensions();

  const status =
    item.reserved === "I've been reserved" ? "Reserved" : item.reserved;

  return (
    <Link
      style={{
        shadowColor: "#fc03f0",
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
      asChild
    >
      <Pressable my={35} p={5}>
        <View justifyContent="center">
          <View>
            <View
              bgColor="#FFF6"
              justifyContent="flex-end"
              alignItems="center"
              py={20}
              px={5}
              width={width / 2 - MARGIN - 10}
              height={200}
              borderRadius={50}
              position="relative"
            >
              <Image
                source={{ uri: item.images[0] }}
                style={{
                  height: width / 2 - 40,
                  width: width / 2 - 40,
                  aspectRatio: 1,
                  borderRadius: 100,
                  position: "absolute",

                  top: -50,
                }}
              />
              <Heading size="lg" numberOfLines={1}>
                {item.name}
              </Heading>
              <Text size="sm" numberOfLines={1}>
                {item.breed.toUpperCase()}
              </Text>
              <Text size="sm">{status}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default MultiColumnDogCard;
