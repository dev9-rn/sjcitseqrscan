import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { ToastProps } from "react-native-toast-notifications/lib/typescript/toast";

import { CircleCheckIcon } from "@/libs/icons/CircleCheckIcon";
import { CircleAlertIcon } from "@/libs/icons/CircleAlertIcon";
import { BadgeInfo } from "@/libs/icons/BadgeInfo";
// import { CircleAlertIcon } from "@/libs/icons/CircleAlertIcon"; // Add if needed

type Props = {
  toastData: ToastProps;
};

const ToastNotification = ({ toastData }: Props) => {
  const type = toastData.data?.type || toastData.type;

  const renderIcon = () => {
    if (toastData.data?.status === "pending") {
      return <ActivityIndicator size="small" color="#0042EB" />;
    }

    switch (type) {
      case "success":
        return <CircleCheckIcon className="text-green-600" />;
      case "danger":
        return <CircleAlertIcon className="text-red-600" />;
      case "warning":
        return <CircleAlertIcon className="text-yellow-500" />;
      case "info":
        return <CircleAlertIcon className="text-blue-500" />;
      default:
        return <CircleAlertIcon className="text-neutral-900" />;
    }
  };

  return (
    <View className="android:shadow-lg ios:shadow-md bg-white p-4 rounded-lg mx-4">
      <View className="flex-row items-center gap-2">
        {renderIcon()}
        <Text className="font-medium text-sm text-black">
          {toastData.message}
        </Text>
      </View>
    </View>
  );
};

export default ToastNotification;
