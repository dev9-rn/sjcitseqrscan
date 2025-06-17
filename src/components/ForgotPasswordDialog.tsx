import React, { Dispatch, useRef, useState } from 'react'

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
import { ActivityIndicator, KeyboardAvoidingView, Modal, Platform, TouchableWithoutFeedback, View } from 'react-native';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from './ui/input';
import axiosInstance from '@/utils/axiosInstance';
import { VERIFIER_RESET_PASSWORD } from '@/utils/routes';
import { X } from '@/libs/icons/X';
import { KeyboardAwareScrollView, KeyboardController } from 'react-native-keyboard-controller';
import useGradualAnimation from '@/hooks/useGradualAnimation';
import { useToast } from 'react-native-toast-notifications';
import { cn } from '@/libs/utils';

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
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { control, handleSubmit, formState: { errors }, } = useForm<ResetFormData>({
        mode: "onChange", // Enables real-time validation updates
        defaultValues: {
            userEmail: ""
        }
    });
    const [loading, setLoading] = useState<boolean>(false)

    // const popoverTriggerRef = useRef<React.ElementRef<typeof DialogContent>>(null);


    const handlePasswordChange: SubmitHandler<ResetFormData | FieldValues> = async (formData) => {
        console.log(formData, "FORMDATA");
        setLoading(true)
        const passwordChangeFormData = new FormData();

        passwordChangeFormData.append('type', 'forgotPassword');
        passwordChangeFormData.append("email_id", formData.userEmail);
        // @ts-ignore
        passwordChangeFormData.append('user_type', 1)

        try {
            const response = await axiosInstance.post(VERIFIER_RESET_PASSWORD, passwordChangeFormData);

            if (response.data.status != 200) {
                toast.show(response.data.message);
            };
            setIsOpen(false)
            toast.show(response.data.message);

        } catch (error) {
            console.log(error, "CATHC_ERROR_PASSWORD_CHANGE");
        } finally {
            // dialogTriggerRef.current?.
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen}>
            <DialogTrigger
                asChild

            >
                <Button
                    variant={"ghost"}
                    size={"sm"}
                    className='p-0'
                    onPress={() => setIsOpen(!isOpen)}
                >
                    <Text className='text-destructive'>
                        Forgot password
                    </Text>
                </Button>
            </DialogTrigger>
            <DialogContent className='relative' style={{ bottom: height.value && height.value - 220 }}>
                <DialogHeader className='relative'>
                    <View className='flex-row justify-between items-center'>
                        <DialogTitle>Forgot Password?</DialogTitle>
                        <Button
                            variant={'ghost'}
                            className={
                                ' web:group rounded-sm opacity-70 web:ring-offset-background web:transition-opacity web:hover:opacity-100 web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2 web:disabled:pointer-events-none'
                            }
                            onPress={()=>setIsOpen(false)}
                        >
                            <X
                                size={Platform.OS === 'web' ? 16 : 18}
                                className={cn('text-muted-foreground', isOpen && 'text-accent-foreground')}
                            />
                        </Button>
                    </View>
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

                <DialogClose asChild >
                    <Button
                        onPress={handleSubmit(handlePasswordChange)}
                    >
                        {loading ? <ActivityIndicator size={'small'} color={'#fff'} /> : <Text>OK</Text>}
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default ForgotPasswordDialog