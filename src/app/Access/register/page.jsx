'use client'

import { Button, Card, Form, Input, Label, TextField, FieldError, Description, InputGroup } from '@heroui/react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaUtensils, FaEye, FaEyeSlash } from 'react-icons/fa';
import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const dataEntries = Object.fromEntries(formData.entries());

        const { name, email, password, image } = dataEntries;

        const { data, error } = await authClient.signUp.email({
            name,
            email,
            password,
            image: image || "",
        });

        setLoading(false);

        if (error) {
            alert(error.message || "Something went wrong!");
            return;
        }

        if (data) {
            alert("Account created successfully!");
            router.push("/");
        }
    };





    return (
        <div className='min-h-screen flex items-center justify-center bg-zinc-950/10 p-4
         font-sans selection:bg-rose-500 selection:text-white'>
            <Card className="w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl shadow-rose-600/5">

                <div className='flex flex-col items-center gap-2 mb-6'>
                    <div className="w-14 h-14 bg-linear-to-b from-amber-500 to-rose-500 rounded-full flex items-center
                     justify-center shadow-lg shadow-rose-500/20">
                        <FaUtensils className="text-zinc-950 w-6 h-6" />
                    </div>
                    <h2 className="font-black text-2xl text-zinc-100 tracking-tight mt-2">
                        Create Account
                    </h2>
                    <p className='text-xs sm:text-sm text-zinc-400 font-medium'>
                        Join TasteTrove to cook & share amazing recipes
                    </p>
                </div>

                <Form className="flex w-full flex-col gap-4"
                    onSubmit={handleSignup}>

                    <TextField isRequired name="name">
                        <Label className='font-semibold text-xs text-zinc-300 tracking-wide uppercase'>Full Name</Label>
                        <Input
                            placeholder="Enter your full name"
                            variant="flat"
                        />
                        <FieldError className="text-rose-500 text-xs mt-1 font-medium" />
                    </TextField>

                    <TextField isRequired name="email" type="email">
                        <Label className='font-semibold text-xs text-zinc-300 tracking-wide uppercase'>Email Address</Label>
                        <Input
                            placeholder="Enter your email address"
                            variant="flat"
                        />
                        <FieldError className="text-rose-500 text-xs mt-1 font-medium" />
                    </TextField>

                    <TextField isRequired name="image">
                        <Label className='font-semibold text-xs text-zinc-300 tracking-wide uppercase'>Profile Image URL</Label>
                        <Input
                            placeholder="https://example.com/avatar.jpg"
                            variant="flat"
                        />
                        <FieldError className="text-rose-500 text-xs mt-1 font-medium" />
                    </TextField>

                    <TextField isRequired name="password">
                        <Label className='font-semibold text-xs text-zinc-300 tracking-wide uppercase'>
                            Password
                        </Label>

                        <InputGroup>
                            <Input
                                placeholder="Create a secure password"
                                variant="flat"
                                type={showPassword ? "text" : "password"}
                                className="w-full"
                            />
                            <InputGroup.Suffix>
                                <Button
                                    isIconOnly
                                    variant="light"
                                    size="sm"
                                    onPress={togglePasswordVisibility}
                                    className="text-rose-500 hover:text-rose-600 "
                                >
                                    {showPassword ?
                                        <FaEyeSlash className="text-xl" /> :
                                        <FaEye className="text-xl" />
                                    }
                                </Button>
                            </InputGroup.Suffix>
                        </InputGroup>

                        <Description className="text-[11px] text-zinc-500 mt-1 leading-normal">
                            Minimum 6 characters with 1 uppercase and 1 lowercase letter.
                        </Description>
                        <FieldError className="text-rose-500 text-xs mt-1 font-medium" />
                    </TextField>


                    <Button
                        type="submit"
                        isLoading={loading}
                        className='w-full bg-rose-600 hover:bg-rose-700 text-white font-bold h-11 rounded-xl
                         transition-all shadow-lg shadow-rose-600/10 mt-2 active:scale-[0.98]'
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </Button>

                   
                </Form>


                <div className="my-5 flex items-center gap-3">
                    <div className="flex-1 h-px bg-zinc-800" />
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">or continue with</p>
                    <div className="flex-1 h-px bg-zinc-800" />
                </div>


                <Button className="w-full h-11 bg-zinc-950 text-zinc-200 border border-zinc-800 hover:bg-zinc-900 font-bold rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2 shadow-sm">
                    <FcGoogle className="text-lg" /> Google
                </Button>


                <p className="text-center text-xs sm:text-sm font-medium text-zinc-400 mt-6">
                    Already have an account?
                    <Link href="/login" className="text-rose-500 font-bold hover:underline pl-1 transition-all">
                        Sign In
                    </Link>
                </p>
            </Card>
        </div>
    );
};

export default SignUpPage;