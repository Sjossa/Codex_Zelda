import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface ItemsProps {
  posts: any[];
}

export function Items({ posts }: ItemsProps) {
  const { width } = Dimensions.get("window");
  const scale = width / 390;
  const rs = (size: number) => Math.round(size * scale);

  const styles = StyleSheet.create({
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
    firstcontainer: {
      backgroundColor: "rgba(0, 47, 39, 0.8)",
      marginBottom: rs(10),
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
      fontSize: rs(22),
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    base: {
      flexDirection: "column",
      paddingVertical: rs(5),
      borderWidth: rs(2),
      borderColor: "white",
    },
    infoText: {
      color: "#FFFFFF",
      fontSize: rs(20),
    },
    description: {
      color: "#FFFFFF",
      fontSize: rs(18),
      marginTop: rs(10),
    },
  });

  // 🔥 State local pour les posts enrichis avec les jeux
  const [enhancedPosts, setEnhancedPosts] = useState<any[]>([]);

  // 🔥 Fetch des jeux pour chaque item
  useEffect(() => {
    const fetchGames = async () => {
      const updatedPosts = await Promise.all(
        posts.map(async (item) => {
          if (Array.isArray(item.games) && item.games.length) {
            try {
              const gamesData = await Promise.all(
                item.games.map(async (url: string) => {
                  const res = await fetch(url);
                  if (!res.ok) throw new Error(url + " -> " + res.status);
                  return res.json();
                })
              );
              return { ...item, games: gamesData };
            } catch {
              return { ...item, games: [] };
            }
          }
          return item;
        })
      );
      setEnhancedPosts(updatedPosts);
    };

    fetchGames();
  }, [posts]);

  // 🔥 Log pour debug
  console.log("ENHANCED POSTS =", enhancedPosts);

  const renderItem = ({ item }: { item: any }) => {
    console.log("ITEM GAMES =", item.games);

    return (
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
            {Array.isArray(item.games) && item.games.length ? (
              item.games.map((game: any, index: number) => (
                <Text key={index} style={styles.infoText}>
                  {game?.data?.name || "Nom du jeu indisponible"}
                </Text>
              ))
            ) : (
              <Text style={styles.infoText}>Aucun jeu associé</Text>
            )}
          </View>
        </View>

        <Text style={styles.description}>
          Description :{"\n"}
          {item.description || "Sans description"}
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={enhancedPosts}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.listContent}
      style={{ flex: 1 }}
    />
  );
}
