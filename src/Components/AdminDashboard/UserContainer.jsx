



"use client";

import React, { useState } from 'react';
import { Button, toast } from "@heroui/react";
import Image from 'next/image';
import {
    // FaBan,
    // FaCheckCircle,
    FaUser,
    FaUserShield,
    FaCrown,
    FaStar,
    FaRegClock,
    FaRegCheckCircle
} from 'react-icons/fa';
import { FaBan } from 'react-icons/fa6';

export default function UserContainer({ initialUsers }) {
    //   const [users, setUsers] = useState(initialUsers);

    const users = initialUsers;
    const getRoleBadge = (role) => {
        if (role === 'admin') {
            return {
                className: "bg-purple-50 text-purple-700 border border-purple-200",
                icon: <FaUserShield className="text-purple-500" />
            };
        }
        return {
            className: "bg-zinc-50 text-zinc-600 border border-zinc-200",
            icon: <FaUser className="text-zinc-400" />
        };
    };

    const getUserTypeBadge = (type) => {
        const normalizedType = type?.toLowerCase() || "";
        if (normalizedType.includes('premium') || normalizedType.includes('pro')) {
            return {
                className: "bg-amber-50 text-amber-700 border border-amber-200 font-bold",
                icon: <FaCrown className="text-amber-500" />
            };
        }
        return {
            className: "bg-blue-50 text-blue-600 border border-blue-200",
            icon: <FaStar className="text-blue-400" />
        };
    };

    const handleToggleBan = (userId, currentStatus) => {
        toast.info(currentStatus ? 'Unbanning user...' : 'Banning user...', {
            description: `User ID: ${userId}`
        });
    };

    return (
        <>
            <div className="hidden md:block overflow-hidden bg-white text-zinc-900 rounded-2xl shadow-sm border border-zinc-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50 text-zinc-500 text-xs uppercase font-bold border-b border-zinc-200">
                                <th className="p-4">User</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">User Type</th>
                                <th className="p-4">Joined At</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {users.map((user) => {
                                const roleBadge = getRoleBadge(user.role);
                                const typeBadge = getUserTypeBadge(user.user_type);
                                const formattedDate = new Date(user.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                });

                                return (
                                    <tr key={user.id || user._id} className="hover:bg-zinc-50/70 transition-colors">

                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-200 shadow-sm shrink-0">
                                                    <Image
                                                        src={user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"}
                                                        alt={user.name}
                                                        fill
                                                        sizes="40px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-zinc-800 text-sm">{user.name}</span>
                                                    <span className="text-zinc-400 text-xs">{user.email}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${roleBadge.className}`}>
                                                {roleBadge.icon}
                                                <span className="capitalize">{user.role}</span>
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full ${typeBadge.className}`}>
                                                {typeBadge.icon}
                                                <span className="capitalize">{user.user_type?.replace('_', ' ')}</span>
                                            </span>
                                        </td>

                                        <td className="p-4 text-zinc-600 text-sm">
                                            <div className="flex items-center gap-1.5 text-zinc-500">
                                                <FaRegClock size={12} />
                                                {formattedDate}
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            {user.banned ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-100">
                                                    Banned
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-100">
                                                    Active
                                                </span>
                                            )}
                                        </td>

                                        <td className="p-4">
                                            <div className="flex items-center justify-center">
                                                <Button
                                                    size="sm"
                                                    variant="flat"
                                                    onPress={() => handleToggleBan(user.id || user._id, user.banned)}
                                                    startContent={user.banned ? <FaRegCheckCircle size={13} className="text-green-600" /> : <FaBan size={12} className="text-red-500" />}
                                                    className={`font-bold rounded-xl w-25 border transition-all duration-200 shadow-sm ${user.banned
                                                            ? "bg-green-50/80 text-green-600 border-green-200/60 hover:bg-green-100 hover:text-green-700"
                                                            : "bg-red-50/80 text-red-600 border-red-200/60 hover:bg-red-100 hover:text-red-700"
                                                        }`}
                                                >
                                                    {user.banned ? 'Unban' : 'Ban User'}
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
                {users.map((user) => {
                    const roleBadge = getRoleBadge(user.role);
                    const typeBadge = getUserTypeBadge(user.user_type);
                    return (
                        <div key={user.id || user._id} className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between gap-4">
                            <div className="flex gap-3 items-center">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-200 shadow-sm shrink-0">
                                    <Image
                                        src={user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"}
                                        alt={user.name}
                                        fill
                                        sizes="48px"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="font-bold text-zinc-800 text-base truncate">{user.name}</span>
                                    <span className="text-zinc-400 text-xs truncate">{user.email}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Role & Type</span>
                                    <div className="flex gap-1.5 items-center">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded ${roleBadge.className}`}>
                                            {roleBadge.icon}
                                            <span className="capitalize">{user.role}</span>
                                        </span>
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold rounded ${typeBadge.className}`}>
                                            {typeBadge.icon}
                                            <span className="capitalize">{user.user_type?.replace('_', ' ')}</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Status</span>
                                    {user.banned ? (
                                        <span className="text-xs font-bold text-red-600">Banned</span>
                                    ) : (
                                        <span className="text-xs font-bold text-green-600">Active</span>
                                    )}
                                </div>
                            </div>

                            <Button
                                size="sm"
                                variant="solid"
                                color={user.banned ? "success" : "danger"}
                                startContent={user.banned ? <FaRegCheckCircle size={12} /> : <FaBan size={12} />}
                                onPress={() => handleToggleBan(user.id || user._id, user.banned)}
                                className={`w-full font-bold text-xs rounded-xl ${user.banned ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                            >
                                {user.banned ? 'Unban User' : 'Ban User'}
                            </Button>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

