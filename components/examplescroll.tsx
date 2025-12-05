// le fichier il est vraiment grand attends faut des commentaires pour que j'arrette de me perdre mdr
// ducoup la c'est les import; nan je vais pas dire a quoi servent tout les import
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import ScreenBackground from "../components/Background/Background";
import {
  buildApiUrl,
  isValidRoute,
  routeToApiEndpoints,
} from "../types/freakyjorys.types";

import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Linking,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

import { Searchbar } from "react-native-paper";
import {
  ClipPath,
  Polygon,
  Rect,
  Svg,
  Image as SvgImage,
} from "react-native-svg";

//taille de l'ecran
const { width } = Dimensions.get("window");
const scale = width / 390;

export default function ExampleScroll({
  typeParam,
}: { typeParam?: string } = {}) {
  // données /:type dans l'url
  const params = useLocalSearchParams();
  const valueFromParams = Array.isArray(params.type)
    ? params.type[0]
    : params.type;
  const value = typeParam ?? valueFromParams;

  // oublié mais en gros
  // ca c'est pour savoir a quel page de l'url on doit aller chercher les données
  const [page, setPage] = useState<number>(1);
  // ca c'est les données fetched
  const [posts, setPosts] = useState<any[]>([]);
  // ca c'est pour savoir quand fetch
  const [loading, setLoading] = useState(false);
  // euh ... je crois que c'est au cas ou l'api ne renvoie plus de données car il n'y a plus rien a envoyer quand page=n
  const [hasMore, setHasMore] = useState(true);
  // new; je saurais plus tard
  const [searchQuery, setSearchQuery] = useState("");
  // ...
  const [shouldFetch, setShouldFetch] = useState(0);

  // Reset si catégorie change
  useEffect(() => {
    if (!value || !isValidRoute(value)) return;
    setPosts([]);
    setPage(1);
    setHasMore(true);
  }, [value]);

  // Fonction pour fetch les données (pagination + recherche)
  const loadPosts = async (pageToLoad: number = page) => {
    if (!value || !isValidRoute(value)) return;
    setLoading(true);

    try {
      const endpoints = routeToApiEndpoints[value];

      const results = await Promise.all(
        endpoints.map(async (endpoint) => {
          const url = `${buildApiUrl(endpoint)}?limit=10&page=${pageToLoad}${
            searchQuery ? `&name=${encodeURIComponent(searchQuery)}` : ""
          }`;
          const res = await fetch(url);
          if (!res.ok) return { data: [] };
          const json = await res.json();
          return { data: json.data || [] };
        })
      );

      const allItems = results.flatMap((r) => r.data || []);

      // FIX: Ajoute aux posts existants au lieu d'écraser si page>1
      if (pageToLoad === 1) setPosts(allItems);
      else setPosts((prev) => [...prev, ...allItems]);

      // euh ... je crois que c'est au cas ou l'api ne renvoie plus de données
      setHasMore(allItems.length === 10);
    } catch (err) {
      console.error("❌ Erreur fetch:", err);
      if (pageToLoad === 1) setPosts([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Pagination
  const loadMore = () => {
    if (!loading && hasMore) setPage((p) => p + 1);
  };

  // Déclenche fetch quand page change
  useEffect(() => {
    loadPosts(page);
  }, [page, value]);

  // Recherche avec debounce
  useEffect(() => {
    if (!value || !isValidRoute(value)) return;

    const delayDebounce = setTimeout(() => {
      setPage(1); // toujours repartir de la première page
      setHasMore(true);
      loadPosts(1);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, value]);

  // Validation de route
  if (!value || !isValidRoute(value)) {
    return (
      <ScreenBackground>
        <Text>Invalid route</Text>
      </ScreenBackground>
    );
  }

  // Reset si catégorie change
  useEffect(() => {
    if (!value || !isValidRoute(value)) return;
    console.log(`🔄 Changement de catégorie vers: ${value}`);
    setPosts([]);
    setPage(1);
    setHasMore(true);
    // Force le re-fetch en changeant ce flag
    setShouldFetch((prev) => prev + 1);
  }, [value]);

  // Open link helper
  const openLink = (url?: string) => {
    if (url) Linking.openURL(url);
  };

  // Render item
  const renderItem = ({ item }: { item: any }) => (
    <Pressable
      style={styles.itemBox}
      onPress={() =>
        router.push(
          `/wiki_bis?type=${value}&name=${encodeURIComponent(item.name)}`
        )
      }
    >
      <Svg width="100%" height="100%" viewBox="0 0 60 60">
        <ClipPath id={`clip-${item.id}`}>
          <Polygon points="30,10 70,10 85,30 70,50 30,50 15,30" />
        </ClipPath>

        <Rect
          x="5"
          y="5"
          width="50"
          height="50"
          strokeWidth="2"
          stroke="#fff"
          fill="none"
        />

        <SvgImage
          href={require("../assets/images/link2.png")}
          x="5"
          y="5"
          width="50"
          height="50"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#clip-${item.id})`}
        />
      </Svg>

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.overlay}
      />
      <Text style={styles.itemText}>{item.name}</Text>
    </Pressable>
  );

  return (
    <ScreenBackground>
      <Text style={styles.title}>{value.toUpperCase()}</Text>

      <Searchbar
        placeholder={`Recherchez un ${typeParam}`}
        onChangeText={setSearchQuery} // déclenche le useEffect
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={{ color: "white" }}
        placeholderTextColor="rgba(255,255,255,0.6)"
        iconColor="white"
      />

      <FlatList
        data={posts}
        keyExtractor={(item, index) => item.id.toString() + "-" + index}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color="#3b59c6"
              style={{ marginTop: 20 }}
            />
          ) : null
        }
        renderItem={renderItem}
      />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: "#3b59c6",
    textAlign: "center",
    fontFamily: "Triforce",
    marginBottom: 10 * scale,
    marginTop: 10 * scale,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
  },

  searchbar: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
  },

  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  itemBox: {
    width: "45%",
    aspectRatio: 1,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50%",
  },

  itemText: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: 18,
    paddingHorizontal: 5,
  },
});
