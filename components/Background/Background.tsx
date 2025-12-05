import { ReactNode } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children?: ReactNode;
};

export default function ScreenBackground({ children }: Props) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Halo bleu Sheikah */}
        <View style={styles.glow} />

        <Image
          source={require("../../assets/images/sheika.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.content}>{children}</View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#03171b",
  },

  safeArea: {
    flex: 1,
  },

  glow: {
    position: "absolute",
    width: 380,
    height: 380,
    borderRadius: 380,
    backgroundColor: "#00eaff",
    opacity: 0.1,
    filter: "blur(60px)",
    alignSelf: "center",
  },

  image: {
    position: "absolute",
    width: 350,
    height: 350,
    opacity: 0.15,
    alignSelf: "center",
  },

  content: {
    flex: 1,
    width: "100%",
    // plus de justifyContent: "center", sinon tout se centre !
  },
});
