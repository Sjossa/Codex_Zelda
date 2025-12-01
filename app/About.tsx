import { StyleSheet, View } from "react-native";

export default function ABout() {
  //   const [name, setName] = useState("");
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Projet zelda</Text>
      <Link href="/Home">avv</Link> */}
      {/* <TextInput
        style={styles.searchbar}
        onChangeText={(text) => setName(text)}
        value={name}
      /> */}
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

  searchbar: {
    backgroundColor: "#000000",
    color: "#FFFFFE",
    width: 250,
  },
});
