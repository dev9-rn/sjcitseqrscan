// src/components/UserDetailsCard.tsx
import React from "react";
import { View, Text, Image } from "react-native";

type UserDetailsCardProps = {
  data: Record<string, string>;
  imageUri?: string;
};

const UserDetailsCard = ({ data, imageUri }: UserDetailsCardProps) => {
  const entries = Object.entries(data).filter(([key]) => key !== "imageUri");

  return (
    <View className="bg-white rounded-2xl shadow-lg p-5 my-4 mx-3">
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          className="w-28 h-28 self-center mb-4 rounded-full border-2 border-blue-500"
        />
      )}
      {entries.map(([key, value]) => (
        <View key={key} className="flex-row mb-2">
          <Text className="font-semibold text-gray-700 w-44">
            {key.trim()}:
          </Text>
          <Text className="text-gray-800 flex-1">{value}</Text>
        </View>
      ))}
    </View>
  );
};

export default UserDetailsCard;
