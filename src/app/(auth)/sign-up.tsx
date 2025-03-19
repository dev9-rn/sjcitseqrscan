import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text } from '@/components/ui/text'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView, KeyboardToolbar } from 'react-native-keyboard-controller';
import axiosInstance from '@/utils/axiosInstance'
import { VERIFIER_SIGNUP } from '@/utils/routes'

type Props = {}

type SignUpForm = {
    userFullName: string;
    userEmail: string;
    userPhone: string;
    userName: string;
    userNewPassword: string;
    userConfirmPassword: string;
}

const SignUpScreen = ({ }: Props) => {

    const inset = useSafeAreaInsets();

    const { control, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
        defaultValues: {
            userFullName: '',
            userEmail: '',
            userName: "",
            userNewPassword: "",
            userPhone: "",
            userConfirmPassword: "",
        }
    });

    const handleUserSignUp: SubmitHandler<SignUpForm | FieldValues> = async (formData) => {
        console.log(formData, "SIGN_UP_FORMDATA");

        const signUpFormData = new FormData();

        signUpFormData.append('type', 'register');
        signUpFormData.append('registration_type', '0');

        try {
            const response = await axiosInstance.post(VERIFIER_SIGNUP, signUpFormData);

            console.log(response.data, "SIGN_UP_RES");
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <>
            <View className='flex-1 p-4 bg-white' style={{ paddingBottom: inset.bottom }}>

                <KeyboardAwareScrollView bottomOffset={62}>
                    <>
                        <View className='mb-6'>
                            <Text className='text-center text-sm xs:text-base text-gray-500'>
                                Please complete all information to create your account on{" "}
                                <Text className='font-medium'>
                                    Demo SeQR Docs
                                </Text>
                            </Text>
                        </View>

                        <View className='gap-4'>
                            <View>
                                <Text className='signUpFormText'>
                                    Full Name
                                </Text>
                                <Controller
                                    control={control}
                                    name='userFullName'
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            className='signUpInputs focus:signUpInputs_Focused'
                                            placeholder='Enter your full name'
                                            keyboardType='default'
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                />
                                {errors.userFullName && <Text>This field is required</Text>}
                            </View>
                            <View>
                                <Text className='signUpFormText'>
                                    Email Address
                                </Text>
                                <Controller
                                    control={control}
                                    name='userEmail'
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            autoCapitalize='none'
                                            className='signUpInputs focus:signUpInputs_Focused'
                                            placeholder='Enter your email'
                                            keyboardType='email-address'
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                />
                            </View>
                            <View>
                                <Text className='signUpFormText'>
                                    Phone Number
                                </Text>
                                <Controller
                                    control={control}
                                    name='userPhone'
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            className='signUpInputs focus:signUpInputs_Focused'
                                            placeholder='Enter your phone number'
                                            keyboardType='phone-pad'
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                />

                            </View>
                            <View>
                                <Text className='signUpFormText'>
                                    Username
                                </Text>
                                <Controller
                                    control={control}
                                    name='userName'
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            className='signUpInputs focus:signUpInputs_Focused'
                                            placeholder='Enter your username'
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                />
                            </View>
                            <View>
                                <Text className='signUpFormText'>
                                    New Password
                                </Text>
                                <Controller
                                    control={control}
                                    name='userNewPassword'
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            className='signUpInputs focus:signUpInputs_Focused'
                                            placeholder='Enter your password'
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                />
                            </View>
                            <View>
                                <Text className='signUpFormText'>
                                    Confirm Password
                                </Text>
                                <Controller
                                    control={control}
                                    name='userConfirmPassword'
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            className='signUpInputs focus:signUpInputs_Focused'
                                            placeholder='Confirm your password'
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                    </>
                </KeyboardAwareScrollView>

                <View className='mt-auto android:mb-6'>
                    <Button
                        onPress={handleSubmit(handleUserSignUp)}
                    >
                        <Text>Sign Up</Text>
                    </Button>
                </View>
            </View>
            <KeyboardToolbar />
        </>
    )
}

export default SignUpScreen