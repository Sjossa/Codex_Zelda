import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Dimensions,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Searchbar } from "react-native-paper";
import Svg, {
  ClipPath,
  Polygon,
  Rect,
  Image as SvgImage,
} from "react-native-svg";

import ScreenBackground from "../components/Background/Background";
import {
  buildApiUrl,
  isValidRoute,
  routeToApiEndpoints,
} from "../types/freakyjorys.types";

const { width } = Dimensions.get("window");
const scale = width / 390;

export default function TwoUrlexamples() {
  const params = useLocalSearchParams();

  const typeParam = Array.isArray(params.type) ? params.type[0] : params.type;

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  console.log("➡️ TYPE nettoyé :", typeParam);

  /** ------------------------------------------
   * 2️⃣ Fetch des API selon route -> endpoints[]
   ------------------------------------------- */
  useEffect(() => {
    if (!typeParam || !isValidRoute(typeParam)) {
      console.warn("❌ Type invalide :", typeParam);
      setLoading(false);
      return;
    }

    setLoading(true);

    const fetchData = async () => {
      try {
        const endpoints = routeToApiEndpoints[typeParam];
        console.log("📡 Endpoints à fetch :", endpoints);

        const results = await Promise.all(
          endpoints.map(async (endpoint) => {
            try {
              const res = await fetch(`${buildApiUrl(endpoint)}?limit=6`);

              if (!res.ok) {
                console.warn(`⚠️ HTTP error sur ${endpoint}: ${res.status}`);
                return { data: [] };
              }

              const contentType = res.headers.get("content-type") || "";
              if (!contentType.includes("application/json")) {
                console.warn(`⚠️ Non-JSON reçu pour ${endpoint}`);
                return { data: [] };
              }

              const json = await res.json();
              return json;
            } catch (err) {
              console.error(`❌ Erreur fetch sur ${endpoint}:`, err);
              return { data: [] };
            }
          })
        );

        const allItems = results.flatMap((r) => r.data || []);
        console.log(`📦 Total items récupérés : ${allItems.length}`);

        setData(allItems);
      } catch (err) {
        console.error("❌ Erreur inattendue :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [typeParam]);

  /** ------------------------------------------
   * 3️⃣ Fonction d’ouverture de lien
   ------------------------------------------- */
  const openLink = (url?: string) => {
    if (url) Linking.openURL(url);
  };

  /** ------------------------------------------
   * 4️⃣ Si type invalide → aucun render
   ------------------------------------------- */
  if (!typeParam || !isValidRoute(typeParam)) return null;

  return (
    <ScreenBackground>
      <Text style={styles.title}>{typeParam.toUpperCase()}</Text>

      <Searchbar
        placeholder={`Recherchez un ${typeParam}`}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={{ color: "white" }}
        placeholderTextColor="rgba(255,255,255,0.6)"
        iconColor="white"
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#3b59c6"
          style={{ marginTop: 40 }}
        />
      ) : data.length > 0 ? (
        <View style={styles.itemsContainer}>
          {data.map((item: any) => (
            <Pressable
              key={item.id}
              style={styles.itemBox}
              onPress={() => openLink(item.href)}
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
          ))}
        </View>
      ) : (
        <Text style={{ textAlign: "center", color: "white", marginTop: 40 }}>
          Aucune donnée trouvée.
        </Text>
      )}
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
  },
});
