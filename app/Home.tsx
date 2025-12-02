import { Href, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  ClipPath,
  Polygon,
  Rect,
  Svg,
  Image as SvgImage,
} from "react-native-svg";

import ScreenBackground from "../components/Background/Background";

type AppRoute = Href;

interface Item {
  id: string;
  type: "box" | "text";
  route?: AppRoute;
  value?: string;
}

export default function Home() {
  const router = useRouter();

  const items: Item[] = [
    { id: "box1", type: "box", route: "/example" },
    { id: "box2", type: "box", route: "/About" },
    { id: "box", type: "box", value: "B" },
    { id: "box3", type: "box", route: "/About" },
  ];

  return (
    <ScreenBackground>
      <Pressable style={styles.topArea} onPress={() => router.push("/About")}>
        <Svg width="100%" height="100%" viewBox="0 0 100 100">
          <ClipPath id="clip">
            <Polygon points="30,10 70,10 85,30 70,50 30,50 15,30" />
          </ClipPath>

          <SvgImage
            href={require("../assets/images/z.webp")}
            x="0"
            y="10"
            width="100"
            height="60"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clip)"
          />

          <Polygon
            points="30,10 70,10 85,30 70,50 30,50 15,30"
            fill="none"
            stroke="red"
            strokeWidth="1"
          />
        </Svg>
      </Pressable>

      <View style={styles.itemsContainer}>
        {items.map((item) =>
          item.type === "box" ? (
            <Pressable
              key={item.id}
              style={styles.itemBox}
              onPress={() => item.route && router.push(item.route)}
            >
              <Svg width="100%" height="100%" viewBox="0 0 60 60">
                <Rect
                  x="5"
                  y="5"
                  width="50"
                  height="50"
                  stroke="red"
                  strokeWidth="2"
                  fill="none"
                />
              </Svg>
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
    height: 260,
  },

  itemsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },

  itemBox: {
    width: "40%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  itemText: {
    width: "40%",
    textAlign: "center",
    fontSize: 30,
  },
});
