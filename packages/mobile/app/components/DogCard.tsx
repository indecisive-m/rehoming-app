import { Card, Heading, Text, VStack } from "@gluestack-ui/themed";
import { Image } from "react-native";

export default function DogCard() {
  return (
    <VStack px={$2}>
      <Card variant="elevated" bgColor={"$cyan400"}>
        <Heading>Dog Name</Heading>
        <Image
          style={{ height: 200, width: 200 }}
          source={{ uri: "https://reactjs.org/logo-og.png" }}
        />
        <Text>Dog</Text>
      </Card>
    </VStack>
  );
}
