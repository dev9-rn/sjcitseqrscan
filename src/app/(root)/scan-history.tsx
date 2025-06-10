import {
  View,
  Platform,
  FlatList,
  useWindowDimensions,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { GET_SCAN_HISTORY } from "@/utils/routes";
import useUser from "@/hooks/useUser";
import { Text } from "@/components/ui/text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/libs/utils";
import { router } from "expo-router";
import { Image } from "expo-image";
import formatDateTime from "@/utils/formatDateTime";

type Props = {};

const BADGES = [
  {
    name: "all",
    title: "All",
  },
  {
    name: "android",
    title: "Android",
  },
  {
    name: "ios",
    title: "iOS",
  },
];

const MIN_COLUMN_WIDTHS = [140, 100, 10];

const ScanHistoryScreen = ({}: Props) => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [userScannedHistory, setUserScannedHistory] = useState<
    IScanHistoryData[]
  >([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { userDetails } = useUser();

  useEffect(() => {
    fetchDocumentScannedHistory();
  }, []);

  const fetchDocumentScannedHistory = async () => {
    setIsloading(true);
    const scannedHistoryFormData = new FormData();

    scannedHistoryFormData.append("device_type", Platform.OS);
    //@ts-ignore
    scannedHistoryFormData.append("user_id", userDetails?.id);
    //@ts-ignore
    scannedHistoryFormData.append("offset", 5);

    try {
      const response = await axiosInstance.post(
        GET_SCAN_HISTORY,
        scannedHistoryFormData
      );

      if (!response.data?.success) {
        throw new Error(response.data?.data.message || response.data?.message);
      }

      const sanatizeScannedHistory = response.data?.data.filter(
        (history: IScanHistoryData) => history.scan_result !== 2
      );

      setUserScannedHistory(sanatizeScannedHistory);
    } catch (error) {
      console.log(error, "FETCH_HISTORY_ERROR");
      throw new Error("Something went wrong" + error);
    } finally {
      setIsloading(false);
    }
  };

  const columnWidths = React.useMemo(() => {
    return MIN_COLUMN_WIDTHS.map((minWidth) => {
      const evenWidth = width / MIN_COLUMN_WIDTHS.length;
      return evenWidth > minWidth ? evenWidth : minWidth;
    });
  }, [width]);

  const goToCertificateDetails = (certificateDetail: IScanHistoryData) => {
    router.navigate({
      pathname: "/scan-history-details",
      params: {
        certificate_details: JSON.stringify(certificateDetail),
      },
    });
  };

  return (
    <View className="flex-1 bg-white p-4">
      <View className="gap-2">
        <Text className="text-2xl font-semibold">All scan history</Text>

        <Text className="font-semibold text-lg">
          Below is the summary for documents
        </Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <ScrollView
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        >
          <Table aria-labelledby="invoice-table">
            <TableHeader>
              <TableRow>
                <TableHead
                  className="px-0.5"
                  style={{ width: columnWidths[0] }}
                >
                  <Text className="font-semibold text-center">Document ID</Text>
                </TableHead>
                <TableHead style={{ width: columnWidths[1] }}>
                  <Text className="font-semibold text-center">Scan Date</Text>
                </TableHead>
                <TableHead style={{ width: columnWidths[2] }}>
                  <Text className="font-semibold">Platform</Text>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <FlatList
                contentContainerStyle={{
                  paddingBottom: insets.bottom,
                }}
                showsVerticalScrollIndicator={false}
                data={userScannedHistory}
                renderItem={({ item, index }) => {
                  return (
                    <TableRow
                      key={item.id}
                      className={cn(
                        "active:bg-muted",
                        index % 2 && "bg-muted/40 "
                      )}
                      onPress={() => goToCertificateDetails(item)}
                    >
                      <TableCell style={{ width: columnWidths[0] }}>
                        <Text>{item.document_id}</Text>
                      </TableCell>
                      <TableCell style={{ width: columnWidths[1] }}>
                        <Text className="text-center">
                          {formatDateTime(item.date_time)}
                        </Text>
                      </TableCell>
                      <TableCell style={{ width: columnWidths[2] }}>
                        <View>
                          <Image
                            source={
                              item.device_type === "ios"
                                ? require("@/assets/images/logos/apple-logo.svg")
                                : item.device_type === "android"
                                ? require("@/assets/images/logos/android-logo.png")
                                : require("@/assets/images/logos/windows.png")
                            }
                            style={{ height: 20, width: 20 }}
                            contentFit="contain"
                          />
                        </View>
                      </TableCell>
                    </TableRow>
                  );
                }}
                keyExtractor={(item) => item.id.toString()}
              />
            </TableBody>
          </Table>
        </ScrollView>
      )}
    </View>
  );
};

export default ScanHistoryScreen;
