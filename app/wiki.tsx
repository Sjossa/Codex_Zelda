import { useLocalSearchParams } from "expo-router";
import React from "react";
import ScreenBackground from "../components/Background/Background";
import ExampleScroll from "../components/examplescroll";
export default function Wiki() {
  const params = useLocalSearchParams();
  const typeParam = Array.isArray(params.type) ? params.type[0] : params.type;

  console.log("Wiki - params:", params);
  console.log("Wiki - typeParam:", typeParam);

  return (
    <ScreenBackground>
      <ExampleScroll typeParam={typeParam} />
      <TwoUrlexamples />
    </ScreenBackground>
  );
}
