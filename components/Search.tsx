import ScreenBackground from "./Background/Background";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styles } from './Header/H-style';
import React from 'react';

export default function About() {
      const { type } = useLocalSearchParams<{ type: string }>();
      const [searchQuery, setSearchQuery] = useState("");

  //   const [name, setName] = useState("");
  return (
    <ScreenBackground>
      <Searchbar
        placeholder={`Recherchez un ${type}`}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={{ color: "white" }}
        placeholderTextColor="rgba(255,255,255,0.6)"
        iconColor="white"
      />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({


  searchbar: {
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
  },)}
