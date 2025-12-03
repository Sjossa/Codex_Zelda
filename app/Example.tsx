import { useLocalSearchParams } from "expo-router";
import React from "react";
import TwoUrlexamples from "../components/TwoUrlexample";

export default function Example() {
  const params = useLocalSearchParams();
  const typeParam = Array.isArray(params.type) ? params.type[0] : params.type;
  console.log("Wiki - params:", params);
  console.log("Wiki - typeParam:", typeParam);
  return <TwoUrlexamples typeParam={typeParam} />;
}
