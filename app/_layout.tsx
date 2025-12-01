import { Drawer } from "expo-router/drawer";
import { Image, StyleSheet } from "react-native";
import Header from "../components/Header/header";

export default function RootLayout() {
  return (
    <>
      <Image
        source={require("../assets/images/tri.png")}
        style={styles.decorImage}
      />

      <Drawer
        screenOptions={{
          header: () => <Header />,
          drawerType: "front",
          drawerStyle: {
            backgroundColor: "#dd1717ff",
            width: 250,
          },
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#0b1e17",
    alignItems: "center",
    justifyContent: "center",
  },

  decorImage: {
    position: "absolute",
    width: 400,
    height: 400,
    opacity: 0.09,
    resizeMode: "contain",
  },
});
