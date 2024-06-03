import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants";
import { Image, Text, View } from "react-native";

const TabsLayout = () => {
  const screenOptions: {
    [key: string]: { title: string; headerShown: boolean };
  } = {
    home: {
      title: "Home",
      headerShown: false,
    },
    create: {
      title: "Create",
      headerShown: false,
    },
    bookmark: {
      title: "Bookmark",
      headerShown: false,
    },
    profile: {
      title: "Profile",
      headerShown: false,
    },
  };
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
          },
        }}
      >
        {Object.keys(screenOptions).map((screenName) => (
          <Tabs.Screen
            key={screenName}
            name={screenName}
            options={{
              ...screenOptions[screenName],
              tabBarIcon: ({ color, focused }) => (
                <View className="items-center justify-center gap-2">
                  <Image
                    source={icons[screenName]}
                    resizeMode="contain"
                    tintColor={color}
                    className="w-6 h-6"
                  />
                  <Text
                    className={`${
                      focused ? "font-psemibold " : " font-pregular"
                    } text-xs `}
                    style={{ color: color }}
                  >
                    {screenOptions[screenName].title}{" "}
                  </Text>
                </View>
              ),
            }}
          />
        ))}
      </Tabs>
    </>
  );
};

export default TabsLayout;
