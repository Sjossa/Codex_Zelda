import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

interface CharactereProps {
  posts: any[];
}

export function Items({ posts }: CharactereProps) {
  const { width } = Dimensions.get("window");
  const scale = width / 390;
  const rs = (size: number) => Math.round(size * scale);

  const styles = StyleSheet.create({
    listBackground: {
      backgroundColor: "rgba(0,0,0,0.2)",
      flex: 1,
    },
    listContent: {
      padding: rs(5),
      flexGrow: 1,
    },
    item: {
      width: "100%",
      minHeight: rs(200),
      marginVertical: rs(5),
      padding: rs(10),
    },
    imageContainer: {
      position: "relative",
      borderWidth: rs(2),
      borderColor: "white",
    },
    image: {
      width: "100%",
      height: rs(180),
      marginBottom: rs(10),
    },
    nameOverlay: {
      position: "absolute",
      bottom: 40,
      left: 40,
      right: 40,
      textAlign: "center",
      color: "#FFFFFF",
      fontFamily: "Triforce",
      fontWeight: "400",
      fontSize: rs(22),
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    base: {
      flexDirection: "column",
      paddingVertical: rs(5),
      textAlign: "left",
      borderWidth: rs(2),
      borderColor: "white",
    },
    description: {
      color: "#FFFFFF",
      fontSize: rs(20),
      textAlign: "left",
    },
    infoText: {
      color: "#FFFFFF",
      fontSize: rs(25),
    },
    firstcontainer: {
      backgroundColor: "rgba(0, 47, 39, 0.8)",
      opacity: 0.8,
      marginBottom: 10,
    },
  });

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <View style={styles.firstcontainer}>
        <View style={styles.imageContainer}>
          <Image
            source={
              item.image
                ? { uri: item.image }
                : require("../../assets/images/default.webp")
            }
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.nameOverlay}>{item.name || "Sans nom"}</Text>
        </View>
        <View style={styles.base}>
          <View>
            <Text style={styles.infoText}>
              Gender: {item.gender || "Sans nom"}
            </Text>
            <Text style={styles.infoText}>Race: {item.race || "Sans nom"}</Text>
          </View>
          <View>
            {Array.isArray(item.appearances) && item.appearances.length ? (
              item.appearances.map((gameitem: any, i: number) => (
                <Text key={i} style={styles.infoText}>
                  {console.log(gameitem)}
                  {gameitem.data.name || "fils de pull"}
                </Text>
              ))
            ) : (
              <Text style={styles.infoText}>Sans nom</Text>
            )}
          </View>
        </View>
      </View>

      <Text style={styles.description}>
        Description:{"\n"}
        {item.description || "Sans description"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{}}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
}
