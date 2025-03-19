import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import ViewCertificate from '@/components/ViewCertificate'

type Props = {}

const ScanHistoryDetails = ({ }: Props) => {

    const { certificate_details } = useLocalSearchParams();

    return (
        <View className='flex-1 bg-white p-4'>
            <ViewCertificate scannedResults={JSON.parse(certificate_details)} />
        </View>
    )
}

export default ScanHistoryDetails