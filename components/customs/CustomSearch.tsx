import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { useState } from "react";

const CustomSearch = () => {
  const pathname = usePathname();
  const [searchquery, setSearchquery] = useState();
  return (
    <View className="bg-black-100 h-14 px-4 border-black-200 rounded-2xl w-full border focus:border-secondary flex items-center flex-row">
      <TextInput
        className="text-base text-white font-pregular mt-0.5 flex-1 "
        value={searchquery}
        placeholder="Search for a video topic"
        placeholderTextColor="#7B7B8B"
        onChangeText={(e: any) => setSearchquery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (searchquery === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("/search")) router.setParams({ searchquery });
          else router.push(`/search/${searchquery}`);
        }}
      >
        <Ionicons name="search" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomSearch;
