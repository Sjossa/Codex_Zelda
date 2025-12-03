import { ReactNode } from "react";
import { Image, StyleSheet, View } from "react-native";

type Props = {
  children?: ReactNode;
};

export default function ScreenBackground({ children }: Props) {
  return (
    <View style={styles.container}>

      {/* Halo bleu Sheikah */}
      <View style={styles.glow} />

      <Image
        source={require("../../assets/images/sheika.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Contenu de la page */}
      <View style={styles.content}>{children}</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#03171b",
    justifyContent: "center",
    alignItems: "center",
  },

  
  glow: {
    position: "absolute",
    width: 380,
    height: 380,
    borderRadius: 380,
    backgroundColor: "#00eaff",
    opacity: 0.10,
    filter: "blur(60px)",
  },


  image: {
    position: "absolute",
    width: 350,
    height: 350,
    opacity: 0.15,
  },


  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
