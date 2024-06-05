import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
interface CustomInputProps {
  title: string;
  handlechange?: (e: any) => void;
  value?: string;
  otherstyles?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  placeholder?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  title,
  value,
  otherstyles,
  handlechange,
  keyboardType,
  placeholder,
}) => {
  const [showpassword, setShowpassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherstyles}`}>
      <Text className="font-psemibold text-base text-gray-200">{title}</Text>
      <View className="bg-black-100 h-14 px-4 border-black-200 rounded-2xl w-full border focus:border-secondary flex items-center flex-row">
        <TextInput
          className="text-base text-white font-psemibold flex-1 "
          value={value}
          onChangeText={handlechange}
          keyboardType={keyboardType}
          secureTextEntry={title === "Password" && !showpassword}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowpassword(!showpassword)}>
            <Ionicons
              name={showpassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;
