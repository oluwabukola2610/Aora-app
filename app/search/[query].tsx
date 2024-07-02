import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "@/components/helper/useAppwrite";
import VideoCard from "@/components/customs/VideoCard";
import CustomSearch from "@/components/customs/CustomSearch";
import { images } from "@/constants";
import CustomButton from "@/components/customs/CustomButton";
import { searchPosts } from "@/components/helper/Appwrite";

const Search = () => {
  const { query } = useLocalSearchParams();
  const searchQueryString = Array.isArray(query)
    ? query.join(" ")
    : query ?? "";
  const { Data, refetch } = useAppwrite(() => searchPosts(searchQueryString));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={Data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard Item={item} />}
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <CustomSearch
                  initialQuery={searchQueryString}
                  refetch={refetch}
                />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <View className="flex justify-center items-center px-4">
            <Image
              source={images.empty}
              resizeMode="contain"
              className="w-[270px] h-[216px]"
            />

            <Text className="text-sm font-pmedium text-gray-100">
              No Videos Found
            </Text>
            <Text className="text-xl text-center font-psemibold text-white mt-2">
              No videos created yet
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
