import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import CustomCheckbox from "@/components/ui/CustomCheckbox";
import axiosInstance from "@/utils/axiosInstance";
import { DELETE_USER } from "@/utils/routes";
import useUser from "@/hooks/useUser";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import CustomModal from "@/components/ui/CustomModal";
import { useToast } from "react-native-toast-notifications";
import { router } from "expo-router";
import { storage } from "@/utils/storageService";
import useAuth from "@/hooks/useAuth";
type Props = {};

type FormData = {
  userName: "";
  userPass: "";
};

const removeAccount = ({}: Props) => {
  const { setIsUserLoggedIn, setAuthToken } = useAuth(); // const { userDetails } = useUser();
  const [agree, setAgree] = useState<boolean>(false);
  const [isUserNameFocused, setIsUserNameFocused] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);

  const popoverTriggerRef =
    useRef<React.ElementRef<typeof PopoverTrigger>>(null);
  const toast = useToast();
  const handleChecked = () => {
    setAgree(!agree);
  };

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange", // Enables real-time validation updates
    defaultValues: {
      userName: "",
      userPass: "",
    },
  });
  const handleRemoveUser: SubmitHandler<FormData | FieldValues> = async (
    formData
  ) => {
    try {
      const params = new FormData();
      params.append("username", formData.userName);
      params.append("password", formData.userPass);

      const response = await axiosInstance.post(DELETE_USER, params);
      console.log(response?.data, "REMOVE USER API DATA");
      if (response?.data?.success) {
        storage.clearAll();
        setAuthToken(null);
        setIsUserLoggedIn(false);
        toast.show(response.data.message, {
          data: { type: "success" },
          placement: "top",
          duration: 4000,
        });

        router.navigate("/(auth)/welcome");
      } else {
        toast.show(response.data.message, {
          data: { type: "danger" },
          placement: "bottom",
          duration: 4000,
        });
      }
    } catch (error) {
      storage.clearAll();
      setAuthToken(null);
      setIsUserLoggedIn(false);
      router.navigate("/(auth)/welcome");
      console.log(error, "REMOVE MY ACCOUNT - API");
    } finally {
      setModalVisible(false);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text className="font-semibold text-center text-[16px] mb-2">
          You can remove your account from our solution using this page.
        </Text>
        <Text className="py-2 text-[16px]">
          Following is the data we store related to your account:
        </Text>
        <View className="px-4">
          <Text className="text-[16px] my-1">
            {"\u2B24"} Your basic profiling details like Name, Phone Number,
            Email-ID and login password.
          </Text>
          <Text className="text-[16px] my-1">
            {"\u2B24"} A log of all your log-ins and logout sessions with
            timestamp and device-id, for security reasons.
          </Text>
          <Text className="text-[16px] my-1">
            {"\u2B24"} Whenever you scan a document for verification, we
            maintain your scan history and payment history, if applicable.
          </Text>
        </View>
        <Text className="my-2 text-[16px]">
          If you agree to remove your account, then we will remove all the above
          data.
        </Text>
        <Text className="my-4 text-[16px]">
          Warning: Before you remove your account, as following will be true
          after that:
        </Text>
        <View className="my-4">
          <Text className=" text-[16px]">
            {"\u274C"} Any document that you have verified till date, will be
            removed and will no longer be associated with your account. Thus,
            you have to re-scan them or/and make re-payments, if applicable.
          </Text>
          <CustomCheckbox
            label={"I have read the above and agree with the above conditions."}
            onChange={handleChecked}
            checked={agree}
          />
        </View>
      </View>
      <View style={styles.removeBtncontainer}>
        <Button
          className={`${agree ? "bg-red-500" : "bg-gray-400"} w-48`}
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-white text-[14px]">Remove My Account</Text>
        </Button>
        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title="Remove My Account"
        >
          <View className="">
            <View className="gap-6">
              <View className="gap-2">
                <Text className="text-lg">Username</Text>
                <Controller
                  control={control}
                  name="userName"
                  rules={{
                    required: "Please enter your username",
                  }}
                  render={({ field: { onBlur, onChange, value } }) => (
                    <View
                      className={`border rounded-lg ${
                        isUserNameFocused
                          ? "border-primary border-2"
                          : "border-input"
                      } ${errors.userName && "border-red-500"}`}
                    >
                      <Input
                        className="border-0"
                        placeholder="Enter your username"
                        keyboardType="default"
                        value={value}
                        onChangeText={onChange}
                        onBlur={() => {
                          onBlur();
                          setIsUserNameFocused(false);
                        }}
                        onFocus={() => {
                          setIsUserNameFocused(true);
                        }}
                      />
                    </View>
                  )}
                />
                {errors.userName && (
                  <Text className="text-destructive">
                    {errors.userName?.message}
                  </Text>
                )}
              </View>

              <View className="gap-2">
                <Text className="text-lg">Password</Text>
                <Controller
                  control={control}
                  name="userPass"
                  rules={{
                    required: "Please enter your password",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View
                      className={`flex-row items-center border rounded-lg ${
                        isPasswordFocused
                          ? "border-primary border-2"
                          : "border-input"
                      } ${errors.userPass && "border-red-500"}`}
                    >
                      <Input
                        className="border-0 border-none flex-1"
                        placeholder="Enter your password"
                        keyboardType="default"
                        secureTextEntry={!isPasswordVisible}
                        value={value}
                        onChangeText={onChange}
                        onBlur={() => {
                          onBlur();
                          setIsPasswordFocused(false);
                        }}
                        onFocus={() => {
                          setIsPasswordFocused(true);
                        }}
                      />
                      <Button
                        className="ml-auto"
                        variant={"ghost"}
                        size={"icon"}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                      >
                        {isPasswordVisible ? (
                          <EyeIcon className="text-primary" />
                        ) : (
                          <EyeOffIcon className="text-primary" />
                        )}
                      </Button>
                    </View>
                  )}
                />

                {errors.userPass && (
                  <Text className="text-destructive">
                    {errors.userPass?.message}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <Button onPress={handleSubmit(handleRemoveUser)} className="my-3">
            <Text className="text-white">Proceed</Text>
          </Button>
        </CustomModal>
        <View>
          <View>
            <Button className="bg-blue-500  w-40" onPress={router.back}>
              <Text className="text-white text-[14px]">Back</Text>
            </Button>
          </View>
        </View>
      </View>
      {/* <Popover>
        <Text className="text-white text-[18px]">Back</Text>
      </Popover> */}
    </ScrollView>
  );
};

export default removeAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    gap: 6,
    flexDirection: "column",
  },
  contentContainer: {
    flex: 1,
  },
  removeBtncontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
});
