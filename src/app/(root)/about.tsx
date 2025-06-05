import { Linking, View } from 'react-native'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

import { GlobeIcon } from "@/libs/icons/GlobeIcon"
import { MailIcon } from "@/libs/icons/MailIcon"

type Props = {}

const AboutUsScreen = ({ }: Props) => {

    const handleEmailPress = () => {
        Linking.openURL("mailto:software@scube.net.in?subject=Enquiry regarding SeQR scan.");
    };

    const handleWebsitePress = () => {
        Linking.openURL("http://scube.net.in");
    }

    return (
        <View className='flex-1 p-4 bg-white'>
            <View className='items-center'>
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle>Contact Us</CardTitle>
                        {/* <CardDescription>Card Description</CardDescription> */}
                    </CardHeader>
                    <CardContent>
                        <Text>
                            Scube offers a variety of ERP solutions for businesses including banks, e-libraries, document management systems, visa on arrival and land taxation systems etc.
                        </Text>
                    </CardContent>
                    <CardFooter className='flex-col items-start w-full gap-4'>
                        <Text>Feel free to contact us to get a qoute.</Text>

                        <View className='flex-row items-center justify-between gap-4'>
                            <Button
                                className='flex-grow flex-row gap-2'
                                onPress={() => handleWebsitePress()}
                            >
                                <GlobeIcon className='text-white' />
                                <Text>Website</Text>
                            </Button>

                            <Button
                                className='flex-grow flex-row gap-2'
                                onPress={() => handleEmailPress()}
                            >
                                <MailIcon className='text-white' />
                                <Text>Email</Text>
                            </Button>
                        </View>
                    </CardFooter>
                </Card>
            </View>
        </View>
    )
}

export default AboutUsScreen