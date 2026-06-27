import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'

const PLAN_PRICES = {
  standard: 'price_1TmYk9BCuOFSdKNVEi4LSQHz', 
  elite: 'price_1TmZlQBCuOFSdKNVCAbG66ah',     
  recipe: 'price_1TmddBBCuOFSdKNVjEY6pMtx',   
}

export async function POST(req) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const body = await req.json()
    const { type, planType, userId, userEmail, userName, recipeId, recipeName } = body

    let priceId, successUrl, metadata, mode

    if (type === 'premium') {
      priceId = PLAN_PRICES[planType]
      mode = 'subscription'
      metadata = { type: 'premium', planType, userId, userEmail, userName }
      successUrl = `${origin}/get_premium/success?session_id={CHECKOUT_SESSION_ID}`
    } 
    else if(type === 'recipe') {
      priceId = PLAN_PRICES.recipe
      mode = 'payment'
      metadata = { type: 'recipe', recipeId, recipeName, userId, userEmail, userName }
      successUrl = `${origin}/recipes/success?session_id={CHECKOUT_SESSION_ID}`
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    if (!priceId) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode,
      customer_email: userEmail,
      metadata,
      success_url: successUrl,
      cancel_url: `${origin}/get_premium`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}