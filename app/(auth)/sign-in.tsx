import { View, Text, ScrollView, Image, Dimensions, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomInput from "@/components/customs/CustomInput";
import CustomButton from "@/components/customs/CustomButton";
import { Link, router } from "expo-router";
import { LoginUser } from "@/components/helper/Appwrite";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const handlesubmit = () => {
    if (!formData.email || !formData.password) {
      Alert.alert("Error", "please fill all required fields");
    }
    setSubmitting(true);
    LoginUser(formData.email, formData.password)
      .then(() => {
        router.replace("home");
      })
      .catch((error) => {
        Alert.alert(
          "Error",
          error.message || "Failed to sign in. Please try again."
        );
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-[84vh] px-4 space-y-6"
          // style={{
          //   minHeight: Dimensions.get("window").height - 100,
          // }}
        >
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white font-psemibold font-semibold">
            Log in Aora
          </Text>
          <CustomInput
            title="Email"
            value={formData.email}
            handlechange={(e: any) => setFormData({ ...formData, email: e })}
            keyboardType="email-address"
            otherstyles="mt-7"
          />
          <CustomInput
            title="Password"
            value={formData.password}
            handlechange={(e: any) => setFormData({ ...formData, password: e })}
            otherstyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={handlesubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
