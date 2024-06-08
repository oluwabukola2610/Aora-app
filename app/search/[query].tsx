import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const search = () => {
  const {query} = useLocalSearchParams();
  return (
    <ScrollView>
      <Text>{query}</Text>
    </ScrollView>
  );
};

export default search;
