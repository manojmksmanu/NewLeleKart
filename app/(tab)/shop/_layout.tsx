import React from "react";
import { Tabs } from "expo-router";

export default function SettingsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="shop"
        options={{
          title: "shop",
          tabBarStyle: { display: "none" }, // Hides the bottom tab bar
          headerShown:false, // Hides the header
        }}
      />
      <Tabs.Screen
        name="categoriesProducts"
        options={{
          title: "categoriesProducts",
          tabBarStyle: { display: "none" }, // Hides the bottom tab bar
          headerShown: false, // Hides the header
        }}
      />
      <Tabs.Screen
        name="productDetails"
        options={{
          title: "productDetails",
          tabBarStyle: { display: "none" }, // Hides the bottom tab bar
          headerShown: false, // Hides the header
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search Product",
          tabBarStyle: { display: "none" }, // Hides the bottom tab bar
          headerShown: false, // Hides the header
        }}
      />
    </Tabs>
  );
}
