import { Tabs } from "expo-router";
import { useColorScheme, StyleSheet, ImageSourcePropType } from "react-native";
import CustomTabIcon from "@/components/molecules/CustomTabsIcon";
import { useTheme } from "@/context/ThemeContext";

type TabIconSet = {
  active: ImageSourcePropType;
  inactive: ImageSourcePropType;
};

type IconMode = {
  home: TabIconSet;
  shop: TabIconSet;
  bag: TabIconSet;
  favorites: TabIconSet;
  profile: TabIconSet;
};

type TabScreen = {
  name: "index" | "shop" | "bag" | "favorites" | "profile";
  title: string;
};

export default function TabLayout() {
  const theme = useTheme();
  const icons: { light: IconMode; dark: IconMode } = {
    light: {
      home: {
        active: require("@/assets/icons/activatedHome.png"),
        inactive: require("@/assets/icons/home.png"),
      },
      shop: {
        active: require("@/assets/icons/activatedShop.png"),
        inactive: require("@/assets/icons/shop.png"),
      },
      bag: {
        active: require("@/assets/icons/activatedBag.png"),
        inactive: require("@/assets/icons/bag.png"),
      },
      favorites: {
        active: require("@/assets/icons/activatedHeart.png"),
        inactive: require("@/assets/icons/heart.png"),
      },
      profile: {
        active: require("@/assets/icons/activatedProfile.png"),
        inactive: require("@/assets/icons/profile.png"),
      },
    },
    dark: {
      home: {
        active: require("@/assets/icons/activatedHome.png"),
        inactive: require("@/assets/icons/inactiveHomeDM.png"),
      },
      shop: {
        active: require("@/assets/icons/activatedShop.png"),
        inactive: require("@/assets/icons/inactiveShopDM.png"),
      },
      bag: {
        active: require("@/assets/icons/activatedBag.png"),
        inactive: require("@/assets/icons/inactiveBagDM.png"),
      },
      favorites: {
        active: require("@/assets/icons/activatedHeart.png"),
        inactive: require("@/assets/icons/inactiveHeartDM.png"),
      },
      profile: {
        active: require("@/assets/icons/activatedProfile.png"),
        inactive: require("@/assets/icons/inactiveProfileDM.png"),
      },
    },
  };

  const tabScreens: TabScreen[] = [
    { name: "index", title: "Home" },
    { name: "shop", title: "Shop" },
    { name: "bag", title: "Bag" },
    { name: "favorites", title: "Favorites" },
    { name: "profile", title: "Profile" },
  ];

  const tabBarStyle = [
    styles.shadowStyle,
    { backgroundColor: theme.secondaryBackground },
  ];

  const getIconKey = (name: TabScreen["name"]): keyof IconMode =>
    name === "index" ? "home" : name;

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {tabScreens.map(({ name, title }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ focused }) => (
              <CustomTabIcon
                focused={focused}
                lightModeIcon={icons.light[getIconKey(name)]}
                darkModeIcon={icons.dark[getIconKey(name)]}
                name={title}
              />
            ),
            tabBarLabel: () => null,
            tabBarStyle,
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  shadowStyle: {
    right: 10,
    paddingTop: 10,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    height: 80,
  },
});
