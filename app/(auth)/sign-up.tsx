import { View, Text, ScrollView, Image, Dimensions, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomInput from "@/components/customs/CustomInput";
import CustomButton from "@/components/customs/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/components/helper/Appwrite";
import { validatePassword } from "@/components/helper/PasswordScheme";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordChange = (e: any) => {
    setFormData({ ...formData, password: e });
    if (passwordError) {
      setPasswordError("");
    }
  };
  const handlesubmit = () => {
    if (!formData.email || !formData.password || !formData.username) {
      Alert.alert("Error", "please fill all required fields");
    }
    if (!validatePassword(formData.password)) {
      setPasswordError(
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }
    setSubmitting(true);
    createUser(formData.email, formData.password, formData.username)
      .then(() => {
        router.replace("home");
      })
      .finally(() => setSubmitting(false));
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
            Sign up
          </Text>
          <CustomInput
            title="Username"
            value={formData.username}
            handlechange={(e: any) => setFormData({ ...formData, username: e })}
            otherstyles="mt-7"
            placeholder="Your unique username"
          />
          <CustomInput
            title="Email"
            value={formData.email}
            handlechange={(e: any) => setFormData({ ...formData, email: e })}
            keyboardType="email-address"
            otherstyles="mt-7 "
            placeholder="@yourmail.com"
          />
          <CustomInput
            title="Password"
            value={formData.password}
            handlechange={handlePasswordChange}
            otherstyles="mt-7"
            placeholder="Your secure password"
          />
          <View>
            <Text className="text-red-500 text-sm">{passwordError}</Text>
          </View>
          <CustomButton
            title="Sign up"
            handlePress={handlesubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login{" "}
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
