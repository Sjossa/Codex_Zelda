import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Header from '../components/Header/header';

export default function Index() {
  const [name, setName] = useState("");
  return (
    <View style={styles.container}>
      <Header/>
      {/* <Text style={styles.title}>Projet zelda</Text>
      <Link href="/Home">avv</Link> */}
      <TextInput
        style={styles.searchbar}
        onChangeText={(text) => setName(text)}
        value={name}
      />
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
  searchbar: {
    backgroundColor: "#000000",
    color: "#FFFFFE",
    width: 250
  },
});
