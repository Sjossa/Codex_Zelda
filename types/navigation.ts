import { DrawerNavigationProp } from "@react-navigation/drawer";

export type RootDrawerParamList = {
  Home: undefined;
  Example: undefined;
  Search: undefined;
};

export type RootDrawerNavigationProp = DrawerNavigationProp<
  RootDrawerParamList,
  "Home",
  "Example"
>;
