import { useLocalSearchParams } from "expo-router";
import React from "react";
import ExampleScroll from "../components/examplescroll";

export default function Example() {
  const params = useLocalSearchParams();
  const typeParam = Array.isArray(params.type) ? params.type[0] : params.type;
  console.log("Wiki - params:", params);
  console.log("Wiki - typeParam:", typeParam);
  return <ExampleScroll typeParam={typeParam} />;
}
