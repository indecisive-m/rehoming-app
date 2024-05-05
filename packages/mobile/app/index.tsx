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
import Drawer from "./components/Drawer";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListRenderItemInfo } from "react-native";

export default function index() {
  const [dogDetails, setDogDetails] = useState<Database[]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const insets = useSafeAreaInsets();
  const [multiColumnView, setMultiColumnView] = useState(false);

  const translateX = useSharedValue(0);
  const [showDrawer, setShowDrawer] = useState(false);
  const [numberOfColumns, setNumberOfColumns] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const data = getDetails();
    data.then((res) => setDogDetails(res));
    getAsyncStorage();

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  const showAvailableDogs = () => {
    setDogDetails(dogDetails.filter((dog) => dog.reserved === "Available"));
  };

  const showAllDogs = () => {
    const data = getDetails();
    data.then((res) => setDogDetails(res));
  };

  const getAsyncStorage = async () => {
    try {
      const layout = await AsyncStorage.getItem("layout");
      const value = JSON.parse(layout);
      if (value === false) {
        setMultiColumnView(false);
        setNumberOfColumns(1);
      }
      if (value === true) {
        setMultiColumnView(true);
        setNumberOfColumns(2);
      }
      return layout;
    } catch (error) {
      console.log(error);
    }
  };

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
      }}
    >
      <View pt={insets.top}>
        {showDrawer && (
          <Drawer
            showDrawer={showDrawer}
            setShowDrawer={setShowDrawer}
            multiColumnView={multiColumnView}
            setMultiColumnView={setMultiColumnView}
            numberOfColumns={numberOfColumns}
            setNumberOfColumns={setNumberOfColumns}
            showAvailableDogs={showAvailableDogs}
            showAllDogs={showAllDogs}
          />
        )}
        <FlatList
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: insets.bottom,
            padding: 10,
          }}
          columnWrapperStyle={multiColumnView ? { gap: 10 } : null}
          key={numberOfColumns}
          numColumns={numberOfColumns}
          ListHeaderComponent={<Header setShowDrawer={setShowDrawer} />}
          showsVerticalScrollIndicator={false}
          data={dogDetails}
          renderItem={({ item }) =>
            multiColumnView ? (
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
