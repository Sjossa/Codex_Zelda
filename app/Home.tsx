import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import {
  ClipPath,
  Polygon,
  Rect,
  Svg,
  Image as SvgImage,
} from "react-native-svg";
import ScreenBackground from "../components/Background/Background";
import { RouteType } from "../types/freakyjorys.types";

const { width, height } = Dimensions.get("window");

const scale = width / 390;
const rs = (size: number) => Math.round(size * scale);

interface Item {
  id: string;
  type: "box" | "text";
  value?: RouteType;
  image?: string;
}

export default function Home() {
  const router = useRouter();

  const items: Item[] = [
    {
      id: "box1",
      type: "box",
      value: "characters",
      image: require("../assets/images/zelda.jpg"),
    },
    {
      id: "box2",
      type: "box",
      value: "locations",
      image: require("../assets/images/carte.png"),
    },
    {
      id: "box",
      type: "box",
      value: "enemies",
      image: require("../assets/images/ennemi.png"),
    },
    {
      id: "box3",
      type: "box",
      value: "items",
      image: require("../assets/images/item.png"),
    },
  ];

  return (
    <ScreenBackground>
      <Pressable style={styles.topArea}>
        <Text style={styles.TextTitre}>Codex Zelda</Text>

        <Svg width="100%" height="100%" viewBox="0 0 100 100">
          <ClipPath id="clip">
            <Polygon points="30,10 70,10 85,30 70,50 30,50 15,30" />
          </ClipPath>

          <SvgImage
            href={require("../assets/images/z.webp")}
            x="0"
            y="10"
            width="100"
            height="50"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clip)"
          />
          <Rect
            x="0"
            y="10"
            width="100"
            height="60"
            fill="black"
            opacity="0.4"
            clipPath="url(#clip)"
          />

          <Polygon
            points="30,10 70,10 85,30 70,50 30,50 15,30"
            fill="none"
            strokeWidth="1"
            onPress={() => router.push(`/Example?type=characters`)}
          />
        </Svg>
      </Pressable>

      <View style={styles.itemsContainer}>
        {items.map((item) =>
          item.type === "box" ? (
            <Pressable
              key={item.id}
              style={styles.itemBox}
              onPress={() => router.push(`/Example?type=${item.value}`)}
            >
              <Svg width="100%" height="100%" viewBox="0 0 60 60">
                <Rect x="5" y="5" width="50" height="50" strokeWidth="2" />

                <SvgImage
                  href={item.image}
                  x="5"
                  y="5"
                  width="50"
                  height="50"
                  preserveAspectRatio="xMidYMid slice"
                />
              </Svg>

              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.8)"]}
                style={styles.overlay}
              />

              <View style={styles.Overlay}>
                <Text style={styles.Text}>{item.value}</Text>
              </View>
            </Pressable>
          ) : (
            <Text key={item.id} style={styles.itemText}>
              {item.value}
            </Text>
          )
        )}
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  topArea: {
    width: "100%",
    height: width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10 * scale,
  },

  itemsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20 * scale,
  },

  itemBox: {
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",

    width: "45%",
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
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

  Text: {
    width: "100%",
    textAlign: "center",
    fontSize: rs(25),
    color: "#FFFFFF",
    fontFamily: "Triforce",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
    opacity: 10,
  },

  TextTitre: {
    width: "100%",
    textAlign: "center",
    fontSize: rs(50),
    color: "#FFFFFF",
    fontFamily: "Triforce",
    // marginBottom: rs(35),
    marginTop: rs(150),
  },

  Overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50%",
  },
});
