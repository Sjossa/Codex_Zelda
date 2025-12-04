import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

import {
  ClipPath,
  Polygon,
  Rect,
  Svg,
  Image as SvgImage,
} from "react-native-svg";
import ScreenBackground from "../components/Background/Background";
import { buildApiUrl, isValidRoute, UrlType } from "../types/freakyjorys.types";

const { width } = Dimensions.get("window");
const scale = width / 390;

export default function ExampleScroll({
  typeParam,
}: { typeParam?: string } = {}) {
  const params = useLocalSearchParams();
  const valueFromParams = Array.isArray(params.type)
    ? params.type[0]
    : params.type;

  const value = typeParam ?? valueFromParams;
  const router = useRouter();

  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Reset si catégorie change
  useEffect(() => {
    if (!value || !isValidRoute(value)) return;
    setPosts([]);
    setPage(1);
    setHasMore(true);
  }, [value]);

  // Chargement API
  useEffect(() => {
    if (!value || !isValidRoute(value) || !hasMore) return;

    const loadPosts = async () => {
      console.groupCollapsed(`Loading page ${page} for ${value}`);
      setLoading(true);
      try {
        const res = await fetch(
          `${buildApiUrl(value as UrlType)}?limit=6&page=${page}`
        );
        const json = await res.json();
        const newItems = json?.data ?? [];

        if (newItems.length === 0) {
          setHasMore(false);
        } else {
          setPosts((prev) => [...prev, ...newItems]);
        }
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [page, value, loading, hasMore]);

  // Validation de route
  if (!value || !isValidRoute(value)) {
    return (
      <ScreenBackground>
        <Text>Invalid route</Text>
      </ScreenBackground>
    );
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      console.log(page);
      setPage((p) => p + 1);
    }
  };

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

        {item.image && (
          <SvgImage
            href={item.image}
            x="5"
            y="5"
            width="50"
            height="50"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#clip-${item.id})`}
          />
        )}
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
    marginBottom: 20 * scale,
    marginTop: -50,

    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
  },

  searchbar: {
    marginHorizontal: 20,
    marginBottom: 30,
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
