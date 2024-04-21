import { Card, Heading, Text, VStack } from "@gluestack-ui/themed";
import { Link } from "expo-router";
import { Image, Pressable, useWindowDimensions } from "react-native";

export default function DogCard({ item }) {
  const PADDING = 20;
  return (
    <Link
      href={{
        pathname: "/dog/[dog]",
        params: { name: item.name },
      }}
      asChild
    >
      <Pressable>
        <Card variant="elevated" bgColor={"$cyan400"} px={PADDING} mb={10}>
          <Heading>{item.name}</Heading>
          <Text>{item.sex}</Text>
          <Image
            source={{ uri: item.images[0] }}
            style={{ height: 300, width: 300 }}
          />
        </Card>
      </Pressable>
    </Link>
  );
}
