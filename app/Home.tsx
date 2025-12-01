import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { Polygon, Svg } from "react-native-svg";
import ScreenBackground from "../components/Background/Background";

export default function Home() {
  const router = useRouter();
  const items = ["a", "b"];

  return (
    <ScreenBackground>
      <Pressable onPress={() => router.push("/About")}>
        <Svg height="400" width="410" viewBox="0 0 60 60">
          <Polygon
            points="20,0 40,0 50,10 40,20 20,20 10,10"
            fill="red"
            strokeWidth="4"
          />
        </Svg>
      </Pressable>

      {items.length === 2 ? (
        items.map((item: any) => <Text key={item.id ?? item}> {item}</Text>)
      ) : (
        <Text>Loading...</Text>
      )}
    </ScreenBackground>
  );
}
