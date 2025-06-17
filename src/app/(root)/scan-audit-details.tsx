import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Separator } from '@/components/ui/separator'
import formatDateTime from '@/utils/formatDateTime'

type Props = {}

const ScanAuditDetails = ({ }: Props) => {

    const { scanned_results } = useLocalSearchParams<{ scanned_results: string, qr_data: string }>()

    const scannedResults: IAuditScanDetails = JSON.parse(scanned_results);

    return (
        <View className='flex-1 bg-white p-4'>
            <View className='mx-1 p-4 android:shadow-lg ios:shadow-md bg-white flex-1'>
                <View className='flex-row items-center'>
                    <Text className='text-lg font-medium'>Barcode: </Text>
                    <Text>{scannedResults.key}</Text>
                </View>
                <Separator className='my-4' />
                <View className='flex-row items-center'>
                    <Text className='text-lg font-medium'>User Printed: </Text>
                    <Text>{scannedResults.userPrinted}</Text>
                </View>
                <Separator className='my-4' />
                <View className='flex-row items-center'>
                    <Text className='text-lg font-medium'>Printed Date: </Text>
                    <Text>{formatDateTime(scannedResults.printingDateTime)}</Text>
                </View>
                <Separator className='my-4' />
                <View className='flex-row items-center'>
                    <Text className='text-lg font-medium'>Printer used: </Text>
                    <Text>{scannedResults.printerUsed}</Text>
                </View>
                <Separator className='my-4' />
                <View className='flex-row items-center'>
                    <Text className='text-lg font-medium'>Print count: </Text>
                    <Text>{scannedResults.printCount}</Text>
                </View>
                <Separator className='my-4' />
                <View className='flex-row items-center'>
                    <Text className='text-lg font-medium'>Status: </Text>
                    <Text className={`${scannedResults.scan_result === 1 && 'text-green-600'}`}>
                        {scannedResults.scan_result === 1 ? "Active" : "Inactive"}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default ScanAuditDetails