import React, { useEffect, useState } from "react";
import { Linking, Text } from "react-native";
import ScreenBackground from "../components/Background/Background";
import { buildApiUrl } from "./src/types/freakyjorys.types";

export default function Example() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${buildApiUrl("games")}?limit=40`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const openLink = (url: string | undefined) => {
    if (!url) return;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const items = data?.data ?? [];

  return (
    <ScreenBackground>
      {items.length > 0 ? (
        items.map((item: any) => (
          <Text key={item.id ?? item.name} onPress={() => openLink(item.href)}>
            <Text>{item.name}</Text>
          </Text>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </ScreenBackground>
  );
}
