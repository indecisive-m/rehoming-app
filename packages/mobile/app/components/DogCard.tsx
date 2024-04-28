import { Heading, Text, View } from "@gluestack-ui/themed";
import { Link } from "expo-router";
import { Image, ListRenderItem } from "react-native";
import { Database } from "../constants/types";

const DogCard: ListRenderItem<Database> = ({ item }) => {
  const borderWidth = 0.75;
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
        backgroundColor: "white",
      }}
      href={{
        pathname: "/dog/[dog]",
        params: { id: item.id },
      }}
    >
      <View p={10} bgColor={"$backgroundDark100"}>
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
            <Heading>{item.reserved}</Heading>
          </View>
        </View>
        <View p={10} width={"100%"} alignItems="flex-start">
          <Heading size="2xl">{item.name}</Heading>
          <Text size="sm">{item.sex.toUpperCase()}</Text>
        </View>
      </View>
    </Link>
  );
};

export default DogCard;
