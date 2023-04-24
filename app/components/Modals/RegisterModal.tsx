'use client';
import React, {useState, useCallback} from 'react';
import axios from "axios";
import {AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import {Button, Modal} from "@/app/components";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/Inputs/Input";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error('Something went wrong')
            })
            .finally(() => {
                setIsLoading(false)
            });


    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subtitle="Create an account"/>
            <Input type="email" id="email" label="Email Address" register={register} errors={errors}
                   disabled={isLoading} required/>
            <Input type="text" id="name" label="Full Name" register={register} errors={errors} disabled={isLoading}
                   required/>
            <Input type="password" id="password" label="Password" register={register} errors={errors}
                   disabled={isLoading} required/>
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Button outline label="Continue with Google" onClick={() => signIn('google')} icon={FcGoogle}/>
            <Button outline label="Continue with GitHub" onClick={() => signIn('github')} icon={AiFillGithub}/>

            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Already have an account?
                    </div>
                    <div onClick={registerModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">
                        Login
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModal;