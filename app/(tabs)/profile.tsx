import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, Text } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import VideoCard from "@/components/customs/VideoCard";
import { icons, images } from "@/constants";
import useAppwrite from "@/components/helper/useAppwrite";
import { getUserPosts, logoutSession } from "@/components/helper/Appwrite";
import InfoBox from "@/components/customs/InfoBox";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { Data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await logoutSession();
    setUser(null);
    setIsLogged(false);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard Item={item} />}
        
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts?.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex justify-center items-center px-4">
            <Text className="text-xl text-center font-psemibold text-white mt-2">
              No videos created yet
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
