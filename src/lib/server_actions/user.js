'use server'

import { headers } from "next/headers";
import { revalidatePath } from "next/cache"; 
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

        revalidatePath("/dashboard/admin/users"); 

        return { success: true };
    } catch (error) {
        console.error("Failed to toggle ban status:", error);
        return { success: false, error: error.message || "Something went wrong" };
    }
}