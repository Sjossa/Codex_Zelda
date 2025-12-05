// components/Header/header.tsx
import { useNavigation } from "@react-navigation/native"; // <-- Change ici
import { Button, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootDrawerNavigationProp } from "../../types/navigation";
import { styles } from "./H-style";

export default function Header() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<RootDrawerNavigationProp>();

  return (
    <View style={[styles.Header, { paddingTop: insets.top }]}>
      <Button color={""} title="Menu" onPress={() => navigation.openDrawer()} />
    </View>
  );
}
