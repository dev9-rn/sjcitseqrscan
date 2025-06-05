import React, { Dispatch, useRef } from 'react'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Text } from './ui/text';
import { KeyboardAvoidingView, Modal, Platform, TouchableWithoutFeedback, View } from 'react-native';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from './ui/input';
import axiosInstance from '@/utils/axiosInstance';
import { VERIFIER_RESET_PASSWORD } from '@/utils/routes';
import { X } from '@/libs/icons/X';
import { KeyboardAwareScrollView, KeyboardController } from 'react-native-keyboard-controller';
import useGradualAnimation from '@/hooks/useGradualAnimation';
import { useToast } from 'react-native-toast-notifications';

type Props = {
    isForgotPasswordVisible: boolean;
    setIsForgotPasswordVisible: Dispatch<React.SetStateAction<boolean>>;
}

type ResetFormData = {
    userEmail: string;
}

const ForgotPasswordDialog = ({ isForgotPasswordVisible, setIsForgotPasswordVisible }: Props) => {

    const { height } = useGradualAnimation();

    const toast = useToast();

    const { control, handleSubmit, formState: { errors }, } = useForm<ResetFormData>({
        mode: "onChange", // Enables real-time validation updates
        defaultValues: {
            userEmail: ""
        }
    });

    const handlePasswordChange: SubmitHandler<ResetFormData | FieldValues> = async (formData) => {
        console.log(formData, "FORMDATA");

        const passwordChangeFormData = new FormData();

        passwordChangeFormData.append('type', 'forgotPassword');
        passwordChangeFormData.append("email_id", formData.userEmail);
        // @ts-ignore
        passwordChangeFormData.append('user_type', 1)

        try {
            const response = await axiosInstance.post(VERIFIER_RESET_PASSWORD, passwordChangeFormData);

            if (response.data.status != 200) {

            };

            toast.show(response.data.message);
        } catch (error) {
            console.log(error, "CATHC_ERROR_PASSWORD_CHANGE");
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={"ghost"}
                    size={"sm"}
                    className='p-0'
                >
                    <Text className='text-destructive'>
                        Forgot password
                    </Text>
                </Button>
            </DialogTrigger>
            <DialogContent className='relative' style={{ bottom: height.value && height.value - 220 }}>
                <DialogHeader>
                    <DialogTitle>Forgot Password?</DialogTitle>
                    <DialogDescription>
                        No worries, we will send you reset instruction
                    </DialogDescription>
                </DialogHeader>
                <View>
                    <Controller
                        control={control}
                        name='userEmail'
                        rules={{
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Please enter a valid email"
                            }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                className={`signUpInputs focus:signUpInputs_Focused`}
                                autoFocus
                                placeholder='Enter your email'
                                keyboardType='email-address'
                                value={value}
                                onBlur={onBlur}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    {errors.userEmail?.type === "required" && <Text className='text-destructive'>Please enter your email</Text>}
                    {(errors.userEmail?.type !== "required" && errors.userEmail) && <Text className='text-destructive'>{errors.userEmail?.message}</Text>}
                </View>

                <DialogClose asChild>
                    <Button
                        onPress={handleSubmit(handlePasswordChange)}
                    >
                        <Text>OK</Text>
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default ForgotPasswordDialog