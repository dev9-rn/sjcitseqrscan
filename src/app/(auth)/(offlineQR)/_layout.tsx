import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Header from "@/components/Header";

type Props = {};

const OfflineLayout = (props: Props) => {
  return (
    <Stack>
      <Stack.Screen
        name="scanQR"
        options={{
          headerBackVisible: false,
          headerShadowVisible: false,
          header: () => <Header isBackVisible headerTitle="Scan QR" />,
        }}
      />
      <Stack.Screen
        name="offline-userData"
        options={{
          headerBackVisible: false,
          headerShadowVisible: false,
          header: () => <Header isBackVisible headerTitle="User Details" />,
        }}
      />
    </Stack>
  );
};

export default OfflineLayout;

const styles = StyleSheet.create({});
