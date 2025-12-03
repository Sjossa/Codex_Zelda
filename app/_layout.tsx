import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header/header";

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  const [loaded] = useFonts({
    Triforce: require("../assets/font/Triforce.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Drawer
      screenOptions={{
        drawerPosition: "right",
        swipeEnabled: false,
        drawerActiveTintColor: "#008080",
        drawerInactiveTintColor: "#FFFFFF",
        header: () => <Header />,
        drawerStyle: {
          backgroundColor: "#03171b",
          width: 250,
          paddingTop: insets.top,
        },
        drawerLabelStyle: {
          fontSize: 20,
          fontFamily: "Triforce",
          color: "#FFFFFF",
        },
      }}
      drawerContent={(props) => (
        <View style={{ flex: 1 }}>
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>

          {/* Image dans le menu */}

          <Image
            source={require("../assets/images/master_sword.png")}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
      )}
    >
      <Drawer.Screen name="Home" options={{ title: "🏠 Home" }} />
      <Drawer.Screen name="Example" options={{ title: "📋 Example" }} />
      {/* <Drawer.Screen name="Search" options={{ title: "ℹ️ About" }} /> */}
    </Drawer>
  );
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    opacity: 0.05,
    resizeMode: "cover",
    zIndex: -1,
    // tintColor: "#00000055"
  },
});
