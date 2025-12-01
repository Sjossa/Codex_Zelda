import { useNavigation } from "expo-router";
import { Button, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./H-style";

export default function Header() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={[styles.Header, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Projet zelda</Text>
      <Button title="aaaa" onPress={() => navigation.openDrawer()} />
    </View>
  );
}
