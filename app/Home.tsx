import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projet zelda</Text>
      <Text style={styles.title}> moa , moa</Text>
      <Link style={styles.title} href="/about">
        about
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0b1e17",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFE",
  },
  button: {
    color: "#fffffe",
    backgroundColor: "#00ff00",
  },
});
