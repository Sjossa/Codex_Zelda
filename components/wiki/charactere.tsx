import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface CharactereProps {
  posts: any[];
}

export function Charactere({ posts }: CharactereProps) {
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
      bottom: 0,
      left: 40,
      right: 40,
      textAlign: "center",
      color: "#FFFFFF",
      fontFamily: "Triforce",
      fontSize: rs(30),
      backgroundColor: "rgba(0, 0, 0, 0.5)",

      // Halo bleu Sheikah
      textShadowColor: "rgba(0, 170, 255, 0.7)",
      textShadowRadius: 12,
      textShadowOffset: { width: 0, height: 0 },
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
                : require("../../assets/images/link2.png")
            }
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.nameOverlay}>{item.name || "Sans nom"}</Text>
        </View>
        <View style={styles.base}>
          <View>
            <Text style={styles.infoText}>
              Gender: {item.gender || "inconue"}
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
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.listContent}
      style={{ flex: 1 }}
    />
  );
}
