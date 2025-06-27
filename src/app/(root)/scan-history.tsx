import {
  View,
  Platform,
  FlatList,
  useWindowDimensions,
  Alert,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
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
// type ItemProps = {
//   item: ItemData;
//   onPress: () => void;
// };

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

const TABS = [
  {
    id: 1,
    name: "SeQR",
  },
  {
    id: 2,
    name: "QR",
  },
];

const DUMMY_DATA = [
  {
    id: 925,
    date_time: "2025-06-11 11:15:58",
    device_type: "android",
    scanned_data: "0D02A0E44B284EE4FE63141763BA0CE2",
    scan_by: "1061",
    scan_result: "1",
    site_id: 248,
    document_id: null,
    document_status: null,
    created_at: null,
    pdf_url:
      "https://securedoc.s3.ap-south-1.amazonaws.com/public/tpsdi/backend/pdf_file/CertD021705.pdf",
  },
  {
    id: 924,
    date_time: "2025-06-11 11:15:51",
    device_type: "android",
    scanned_data: "0D02A0E44B284EE4FE63141763BA0CE2",
    scan_by: "1061",
    scan_result: "1",
    site_id: 248,
    document_id: null,
    document_status: null,
    created_at: null,
    pdf_url:
      "https://securedoc.s3.ap-south-1.amazonaws.com/public/tpsdi/backend/pdf_file/CertD021705.pdf",
  },
  {
    id: 923,
    date_time: "2025-06-11 11:13:49",
    device_type: "android",
    scanned_data: "0D02A0E44B284EE4FE63141763BA0CE2",
    scan_by: "1061",
    scan_result: "1",
    site_id: 248,
    document_id: null,
    document_status: null,
    created_at: null,
    pdf_url:
      "https://securedoc.s3.ap-south-1.amazonaws.com/public/tpsdi/backend/pdf_file/CertD021705.pdf",
  },
  {
    id: 922,
    date_time: "2025-06-11 11:13:19",
    device_type: "android",
    scanned_data: "0D02A0E44B284EE4FE63141763BA0CE2",
    scan_by: "1061",
    scan_result: "1",
    site_id: 248,
    document_id: null,
    document_status: null,
    created_at: null,
    pdf_url:
      "https://securedoc.s3.ap-south-1.amazonaws.com/public/tpsdi/backend/pdf_file/CertD021705.pdf",
  },
  {
    id: 921,
    date_time: "2025-06-11 11:12:08",
    device_type: "android",
    scanned_data: "0D02A0E44B284EE4FE63141763BA0CE2",
    scan_by: "1061",
    scan_result: "1",
    site_id: 248,
    document_id: null,
    document_status: null,
    created_at: null,
    pdf_url:
      "https://securedoc.s3.ap-south-1.amazonaws.com/public/tpsdi/backend/pdf_file/CertD021705.pdf",
  },
  {
    id: 920,
    date_time: "2025-06-11 11:07:50",
    device_type: "android",
    scanned_data: "0D02A0E44B284EE4FE63141763BA0CE2",
    scan_by: "1061",
    scan_result: "1",
    site_id: 248,
    document_id: null,
    document_status: null,
    created_at: null,
    pdf_url:
      "https://securedoc.s3.ap-south-1.amazonaws.com/public/tpsdi/backend/pdf_file/CertD021705.pdf",
  },
  {
    id: 919,
    date_time: "2025-06-11 11:07:39",
    device_type: "android",
    scanned_data: "0D02A0E44B284EE4FE63141763BA0CE2",
    scan_by: "1061",
    scan_result: "1",
    site_id: 248,
    document_id: null,
    document_status: null,
    created_at: null,
    pdf_url:
      "https://securedoc.s3.ap-south-1.amazonaws.com/public/tpsdi/backend/pdf_file/CertD021705.pdf",
  },
  {
    id: 918,
    date_time: "2025-06-11 11:07:35",
    device_type: "android",
    scanned_data: "0D02A0E44B284EE4FE63141763BA0CE2",
    scan_by: "1061",
    scan_result: "1",
    site_id: 248,
    document_id: null,
    document_status: null,
    created_at: null,
    pdf_url:
      "https://securedoc.s3.ap-south-1.amazonaws.com/public/tpsdi/backend/pdf_file/CertD021705.pdf",
  },
  {
    id: 917,
    date_time: "2025-06-11 11:07:19",
    device_type: "android",
    scanned_data: "0D02A0E44B284EE4FE63141763BA0CE2",
    scan_by: "1061",
    scan_result: "1",
    site_id: 248,
    document_id: null,
    document_status: null,
    created_at: null,
    pdf_url:
      "https://securedoc.s3.ap-south-1.amazonaws.com/public/tpsdi/backend/pdf_file/CertD021705.pdf",
  },
  {
    id: 916,
    date_time: "2025-06-11 11:07:12",
    device_type: "android",
    scanned_data: "0D02A0E44B284EE4FE63141763BA0CE2",
    scan_by: "1061",
    scan_result: "1",
    site_id: 248,
    document_id: null,
    document_status: null,
    created_at: null,
    pdf_url:
      "https://securedoc.s3.ap-south-1.amazonaws.com/public/tpsdi/backend/pdf_file/CertD021705.pdf",
  },
  {
    id: 915,
    date_time: "2025-06-11 11:07:06",
    device_type: "android",
    scanned_data: "0D02A0E44B284EE4FE63141763BA0CE2",
    scan_by: "1061",
    scan_result: "1",
    site_id: 248,
    document_id: null,
    document_status: null,
    created_at: null,
    pdf_url:
      "https://securedoc.s3.ap-south-1.amazonaws.com/public/tpsdi/backend/pdf_file/CertD021705.pdf",
  },
  {
    id: 914,
    date_time: "2025-06-11 11:06:55",
    device_type: "android",
    scanned_data: "0D02A0E44B284EE4FE63141763BA0CE2",
    scan_by: "1061",
    scan_result: "1",
    site_id: 248,
    document_id: null,
    document_status: null,
    created_at: null,
    pdf_url:
      "https://securedoc.s3.ap-south-1.amazonaws.com/public/tpsdi/backend/pdf_file/CertD021705.pdf",
  },
  {
    id: 913,
    date_time: "2025-06-11 11:06:54",
    device_type: "android",
    scanned_data: "0D02A0E44B284EE4FE63141763BA0CE2",
    scan_by: "1061",
    scan_result: "1",
    site_id: 248,
    document_id: null,
    document_status: null,
    created_at: null,
    pdf_url:
      "https://securedoc.s3.ap-south-1.amazonaws.com/public/tpsdi/backend/pdf_file/CertD021705.pdf",
  },
  {
    id: 912,
    date_time: "2025-06-11 11:06:53",
    device_type: "android",
    scanned_data: "0D02A0E44B284EE4FE63141763BA0CE2",
    scan_by: "1061",
    scan_result: "1",
    site_id: 248,
    document_id: null,
    document_status: null,
    created_at: null,
    pdf_url:
      "https://securedoc.s3.ap-south-1.amazonaws.com/public/tpsdi/backend/pdf_file/CertD021705.pdf",
  },
  {
    id: 911,
    date_time: "2025-06-11 11:06:51",
    device_type: "android",
    scanned_data: "0D02A0E44B284EE4FE63141763BA0CE2",
    scan_by: "1061",
    scan_result: "1",
    site_id: 248,
    document_id: null,
    document_status: null,
    created_at: null,
    pdf_url:
      "https://securedoc.s3.ap-south-1.amazonaws.com/public/tpsdi/backend/pdf_file/CertD021705.pdf",
  },
  {
    id: 910,
    date_time: "2025-06-11 11:06:50",
    device_type: "android",
    scanned_data: "0D02A0E44B284EE4FE63141763BA0CE2",
    scan_by: "1061",
    scan_result: "1",
    site_id: 248,
    document_id: null,
    document_status: null,
    created_at: null,
    pdf_url:
      "https://securedoc.s3.ap-south-1.amazonaws.com/public/tpsdi/backend/pdf_file/CertD021705.pdf",
  },
  {
    id: 909,
    date_time: "2025-06-11 11:06:49",
    device_type: "android",
    scanned_data: "0D02A0E44B284EE4FE63141763BA0CE2",
    scan_by: "1061",
    scan_result: "1",
    site_id: 248,
    document_id: null,
    document_status: null,
    created_at: null,
    pdf_url:
      "https://securedoc.s3.ap-south-1.amazonaws.com/public/tpsdi/backend/pdf_file/CertD021705.pdf",
  },
  {
    id: 908,
    date_time: "2025-06-11 11:06:48",
    device_type: "android",
    scanned_data: "0D02A0E44B284EE4FE63141763BA0CE2",
    scan_by: "1061",
    scan_result: "1",
    site_id: 248,
    document_id: null,
    document_status: null,
    created_at: null,
    pdf_url:
      "https://securedoc.s3.ap-south-1.amazonaws.com/public/tpsdi/backend/pdf_file/CertD021705.pdf",
  },
  {
    id: 907,
    date_time: "2025-06-11 11:06:47",
    device_type: "android",
    scanned_data: "0D02A0E44B284EE4FE63141763BA0CE2",
    scan_by: "1061",
    scan_result: "1",
    site_id: 248,
    document_id: null,
    document_status: null,
    created_at: null,
    pdf_url:
      "https://securedoc.s3.ap-south-1.amazonaws.com/public/tpsdi/backend/pdf_file/CertD021705.pdf",
  },
  {
    id: 906,
    date_time: "2025-06-11 11:06:45",
    device_type: "android",
    scanned_data: "0D02A0E44B284EE4FE63141763BA0CE2",
    scan_by: "1061",
    scan_result: "1",
    site_id: 248,
    document_id: null,
    document_status: null,
    created_at: null,
    pdf_url:
      "https://securedoc.s3.ap-south-1.amazonaws.com/public/tpsdi/backend/pdf_file/CertD021705.pdf",
  },
];

const MIN_COLUMN_WIDTHS = [140, 100, 10];

const HistoryCard = ({ item, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-white p-4 mb-3 rounded-2xl shadow-md flex-row justify-between items-center"
  >
    <View className="flex-1 pr-4">
      <View className="mb-2">
        <Text className="text-sm text-gray-600 font-semibold">Document ID</Text>
        <Text className="text-base text-gray-800">
          {item?.document_id == null ? "Not found!" : item?.document_id}
        </Text>
      </View>

      <View>
        <Text className="text-sm text-gray-600 font-semibold">Scan Date</Text>
        <Text className="text-sm text-gray-700">
          {formatDateTime(item.date_time)}
        </Text>
      </View>
    </View>

    <View className="bg-gray-100 p-2 rounded-full">
      <Image
        source={
          item.device_type === "ios"
            ? require("@/assets/images/logos/apple-logo.svg")
            : item.device_type === "android"
              ? require("@/assets/images/logos/android-logo.png")
              : require("@/assets/images/logos/windows.png")
        }
        style={{ height: 24, width: 24, resizeMode: "contain" }}
      />
    </View>
  </TouchableOpacity>
);

const ScanHistoryScreen = ({ }: Props) => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [userScannedHistory, setUserScannedHistory] = useState<
    IScanHistoryData[]
  >([]);
  const [userSeQRData, setUserSeQRData] = useState<[]>([]);
  const [userQRData, setUserQRData] = useState<[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { userDetails } = useUser();
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  useEffect(() => {
    fetchDocumentScannedHistory();
  }, []);

  const handleTabSwitch = (index: number) => {
    setActiveTabIndex(index);
    // pagerRef.current?.setPage(index);
  };

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

      const tempSeQRData = [];
      const tempQRData = [];

      for (let i = 0; i < response.data?.data?.length; i++) {
        const item = response.data?.data[i];
        if (item.scan_result === '1') {
          if (item.document_id !== null) {
            tempSeQRData.push(item);
          }
        } else {
          if (item.document_id !== null) {
            tempQRData.push(item);
          }
        }
      }

      setUserSeQRData(tempSeQRData);
      setUserQRData(tempQRData);
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

  const renderHistoryCard = useCallback(({ item, index }) => {

    if (!item) {
      return (
        <Text className="text-[24px] color-slate-400 text-center m-4">
          No history available!
        </Text>
      );
    }

    return (
      <View style={{ paddingHorizontal: 16 }}>
        <HistoryCard item={item} onPress={() => goToCertificateDetails(item)} />
      </View>
    );
  }, []);

  return (
    <View className="flex-1 bg-white">
      {/* <View className="gap-2">
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
          {userScannedHistory?.length > 0 && !isLoading ? (
            <Table aria-labelledby="invoice-table">
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="px-0.5"
                    style={{ width: columnWidths[0] }}
                  >
                    <Text className="font-semibold text-center">
                      Document ID
                    </Text>
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
          ) : (
            <Text className="text-[24px] color-slate-400 text-center m-4">
              No History available!
            </Text>
          )}
        </ScrollView>
      )} */}
      <View className="flex-row items-center justify-around border-b-2 border-gray-200">
        {TABS.map((tab, index) => (
          <TouchableOpacity
            key={tab.id}
            className={`flex-1 py-2 ${activeTabIndex == index ? "border-b-2 border-black" : "border-0"
              } `}
            onPress={() => handleTabSwitch(index)}
          >
            <Text
              className={`text-center text-base xs:text-lg ${activeTabIndex == index ? "text-black font-medium" : ""
                }`}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {isLoading ? (
        <ActivityIndicator size={"large"} color={'#000'} />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={activeTabIndex == 0 ? userSeQRData : userQRData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderHistoryCard}
            ListEmptyComponent={
              <Text className="text-[24px] color-slate-400 text-center mt-4">
                No history available!
              </Text>
            }
            contentContainerStyle={{
              flexGrow: 1,
              paddingVertical: 16,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default ScanHistoryScreen;
