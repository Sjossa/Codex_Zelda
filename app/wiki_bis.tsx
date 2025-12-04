import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import ScreenBackground from "../components/Background/Background";
import { fetchPaginatedData } from "../components/fetch";
import { Charactere } from "../components/wiki/charactere";
import { Items } from "../components/wiki/Items";
import { isValidRoute, UrlType } from "../types/freakyjorys.types";

export default function WikiBis({ typeParam }: { typeParam?: string } = {}) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { type, name } = useLocalSearchParams();

  const valueFromParams = Array.isArray(type) ? type[0] : type;

  const value = typeParam ?? valueFromParams;

  useEffect(() => {
    if (!value || !isValidRoute(value)) return;

    setPosts([]);
    setHasMore(true);

    const loadPosts = async () => {
      setLoading(true);

      const nameParam = Array.isArray(name) ? name[0] : name;
      const { items, hasMore: moreAvailable } = await fetchPaginatedData(
        value as UrlType,
        nameParam
      );

      const enhancedItems = await Promise.all(
        items.map(async (item: any) => {
          if (Array.isArray(item.appearances) && item.appearances.length) {
            try {
              const appearancesData = await Promise.all(
                item.appearances.map(async (url: string) => {
                  const res = await fetch(url);
                  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
                  return res.json();
                })
              );
              return { ...item, appearances: appearancesData };
            } catch {
              return { ...item, appearances: [] };
            }
          }
          return item;
        })
      );

      setPosts(enhancedItems);
      setHasMore(moreAvailable);
      setLoading(false);
    };

    loadPosts();
  }, [value, name]);

  return (
    <ScreenBackground>
      {value === "characters" ? (
        <Charactere posts={posts} />
      ) : value === "items" ? (
        <Items posts={posts} />
      ) : (
        <Text>Catégorie non prise en charge</Text>
      )}
    </ScreenBackground>
  );
}
