'use client'

import { Button, Card, Form, Input, Label, TextField, FieldError, InputGroup } from '@heroui/react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaUtensils, FaEye, FaEyeSlash } from 'react-icons/fa';
import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const dataEntries = Object.fromEntries(formData.entries());

        const { email, password } = dataEntries;

        const { data, error } = await authClient.signIn.email({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            alert(error.message || "Invalid email or password!");
            return;
        }

        if (data) {
            // alert("Logged in successfully!");
            router.push("/");
            setTimeout(()=> {
window.location.reload()
}, 500)

        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-zinc-950/10 p-4 font-sans selection:bg-rose-500 selection:text-white'>
            <Card className="w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl shadow-rose-600/5">

                <div className='flex flex-col items-center gap-2 mb-6'>
                    <div className="w-14 h-14 bg-linear-to-b from-amber-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg shadow-rose-500/20">
                        <FaUtensils className="text-zinc-950 w-6 h-6" />
                    </div>
                    <h2 className="font-black text-2xl text-zinc-100 tracking-tight mt-2">
                        Welcome Back
                    </h2>
                    <p className='text-xs sm:text-sm text-zinc-400 font-medium'>
                        Sign in to TasteTrove to access your recipes
                    </p>
                </div>

                <Form className="flex w-full flex-col gap-4" onSubmit={handleLogin}>

                    <TextField isRequired name="email" type="email">
                        <Label className='font-semibold text-xs text-zinc-300 tracking-wide uppercase'>Email Address</Label>
                        <Input
                            placeholder="Enter your email address"
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
                                placeholder="Enter your password"
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
                                    className="text-rose-500 hover:text-rose-600"
                                >
                                    {showPassword ?
                                        <FaEyeSlash className="text-xl" /> :
                                        <FaEye className="text-xl" />
                                    }
                                </Button>
                            </InputGroup.Suffix>
                        </InputGroup>
                        <FieldError className="text-rose-500 text-xs mt-1 font-medium" />
                    </TextField>

                    <Button
                        type="submit"
                        isLoading={loading}
                        className='w-full bg-rose-600 hover:bg-rose-700 text-white font-bold h-11 rounded-xl transition-all shadow-lg shadow-rose-600/10 mt-2 active:scale-[0.98]'
                    >
                        {loading ? "Signing In..." : "Sign In"}
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
                    Don't have an account?
                    <Link href="/Access/register" className="text-rose-500 font-bold hover:underline pl-1 transition-all">
                        Sign Up
                    </Link>
                </p>
            </Card>
        </div>
    );
};

export default LoginPage;