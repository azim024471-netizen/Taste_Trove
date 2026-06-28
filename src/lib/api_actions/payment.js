'use server'


import { serverMutation } from "../core_function/server"




export const upgradeUserType = async (userId, planType) => {

    return serverMutation(`/api/users/upgrade-premium/${userId}`, { planType }, 'PATCH');
}



export const keepPaymentData = async (data) => {
    return serverMutation('/api/payments', data, 'POST');
}




export const keepPurchesData = async (purchasData) => {

    return serverMutation('/api/purchased', purchasData, 'POST');
}