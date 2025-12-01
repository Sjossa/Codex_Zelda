import { Drawer } from "expo-router/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header/header";

export default function RootLayout() {
  const insets = useSafeAreaInsets();

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
      color: '#fff',
    },
      }}
    >
      <Drawer.Screen name="Home" options={{ title: "🏠 Accueil" }} />
      <Drawer.Screen name="About" options={{ title: "À propos" }} />
    </Drawer>
  );
}
