import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomSearch from "@/components/customs/CustomSearch";
import Trending from "@/components/customs/Trending";
import CustomButton from "@/components/customs/CustomButton";
import { router } from "expo-router";
import { getAllPosts, getLatestPosts } from "@/components/helper/Appwrite";
import useAppwrite from "@/components/helper/useAppwrite";
import VideoCard from "@/components/customs/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
const Home = () => {
  const { Data: posts, refetch } = useAppwrite(getAllPosts);
  const { Data: latestPost } = useAppwrite(getLatestPosts);
  const [refreshing, setRefecting] = useState(false);
  const { user } = useGlobalContext();

  const onrefesh = async () => {
    setRefecting(true);
    await refetch();
    setRefecting(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard Item={item} />}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user.username}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <CustomSearch />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>
              <Trending posts={latestPost ?? []} />
            </View>
          </View>
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

            <CustomButton
              title="Back to Explore"
              handlePress={() => router.push("/home")}
              containerStyles="w-full my-5"
            />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onrefesh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
