import { Text, FlatList, View } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import DogCard from "./components/DogCard";
import getDetails from "./utils/getDetails";
import Header from "./components/Header";
import { Database } from "./constants/types";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ImageCard from "./components/Loading";
import Loading from "./components/Loading";
import MultiColumnDogCard from "./components/MultiColumnDogCard";

export default function index() {
  const [dogDetails, setDogDetails] = useState<Database[]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const insets = useSafeAreaInsets();
  const [columnView, setColumnView] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const data = getDetails();
    data.then((res) => setDogDetails(res));

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <LinearGradient
        colors={["#FFF", "rgba(100, 100, 100, 0.2)"]}
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text color="white">Loading...</Text>
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
      }}
    >
      <View pt={insets.top}>
        <FlatList
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: insets.bottom,
            padding: 10,
            // backgroundColor: "blue",
          }}
          columnWrapperStyle={columnView ? { gap: 10 } : null}
          numColumns={columnView ? 2 : 1}
          ListHeaderComponent={<Header />}
          showsVerticalScrollIndicator={false}
          data={dogDetails}
          renderItem={({ item }) =>
            columnView ? (
              <MultiColumnDogCard item={item} />
            ) : (
              <DogCard item={item} />
            )
          }
        />
      </View>
    </LinearGradient>
  );
}
