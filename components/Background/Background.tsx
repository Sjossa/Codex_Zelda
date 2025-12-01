import { View, StyleSheet } from "react-native";
import { ReactNode } from 'react';

type Props = {
    children? : ReactNode;
}

export default function ScreenBackground({ children }: Props) {
  return (
    <View style={styles.container}>
      {children
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#03171b",
    justifyContent: 'center',
    alignItems: 'center'
  },
});
