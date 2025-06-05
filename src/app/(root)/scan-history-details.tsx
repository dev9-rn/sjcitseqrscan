import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import ViewCertificate from '@/components/ViewCertificate'
import { ChevronLeft } from "@/libs/icons/ChevronLeft"
import { Button } from '@/components/ui/button'

type Props = {}

const ScanHistoryDetails = ({ }: Props) => {

    const { certificate_details } = useLocalSearchParams();

    const navigation = useNavigation();

    useEffect(() => {
        const parsedDetails: IScanHistoryData = JSON.parse(certificate_details);

        navigation.setOptions({
            header: () => (
                <View className='flex-row items-center p-4 bg-white'>
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        onPress={() => router.back()}
                    >
                        <ChevronLeft className={`text-stone-900`} />
                    </Button>

                    <Text className='text-base xs:text-lg font-semibold text-black'>
                        {parsedDetails.document_id}
                    </Text>
                </View>
            )
        })
    }, []);

    return (
        <View className='flex-1 bg-white p-4'>
            <ViewCertificate scannedResults={JSON.parse(certificate_details)} />
        </View>
    )
}

export default ScanHistoryDetails