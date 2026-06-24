'use server'

import { headers } from "next/headers";
// import { auth } from "../auth";
import { revalidatePath } from "next/cache"; // 👈 এই ইম্পোর্টটি অবশ্যই লাগবে
import { auth } from "../auth";

export const toggleUserBanAction = async (userId, isBanned) => {
    try {
        if (isBanned) {
            await auth.api.unbanUser({
                body: { userId },
                headers: await headers()
            });
        } else {
            await auth.api.banUser({
                body: { userId },
                headers: await headers()
            });
        }

        // 🔄 ডাটা রিভ্যালিডেট হবে যেন পেজ রিফ্রেশ ছাড়াই টেবিল আপডেট হয়
        revalidatePath("/dashboard/admin/users"); 

        return { success: true };
    } catch (error) {
        console.error("Failed to toggle ban status:", error);
        return { success: false, error: error.message || "Something went wrong" };
    }
}