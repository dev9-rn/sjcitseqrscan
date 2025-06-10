import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "@/libs/LucideIcon";

type Props = {
  label: string;
  checked: boolean;
  onChange: (newValue: boolean) => void;
};

const CustomCheckbox: React.FC<Props> = ({ label, checked, onChange }) => {
  return (
    <TouchableOpacity
      onPress={() => onChange(!checked)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12
      }}
    >
      <View
        style={{
          height: 18,
          width: 18,
          borderRadius: 4,
          borderWidth: 2,
          borderColor: checked ? "#4CAF50" : "#999",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 12,
        }}
      >
        {checked && (
          <Icon name="Check" size={16} color="#4CAF50" />
        )}
      </View>
      <Text className="text-[16px]">{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomCheckbox;
