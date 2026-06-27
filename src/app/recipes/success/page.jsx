import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import Link from 'next/link'
import { FaCheckCircle, FaUtensils, FaArrowRight } from 'react-icons/fa'
import { keepPaymentData, keepPurchesData } from '@/lib/api_actions/payment'

const RecipeSuccessPage = async ({ searchParams }) => {

  const resolvedParams = await searchParams
  const sessionId = resolvedParams?.session_id

  if (!sessionId) redirect('/recipes')

  const session = await stripe.checkout.sessions.retrieve(sessionId)
  if (session.payment_status !== 'paid') redirect('/recipes')

  const { userId, userEmail, userName, recipeId, recipeName } = session.metadata

   
  const purchasedData ={
      userId, 
      userEmail, 
      userName,
      recipeId, 
      recipeName,
  }
  
  const paymentData = {
    type: 'recipe',
    userId, 
    userEmail, 
    userName,
    recipeId, 
    recipeName,
    amount: 2.99,
    transactionId: session.payment_intent || session.id, 
    paymentStatus: 'completed',
    stripeSessionId: sessionId,
  }
  
  keepPurchesData(purchasedData)

  keepPaymentData(paymentData)


  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center z-10">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-6">
          <FaCheckCircle className="text-5xl" />
        </div>
        <h1 className="text-2xl font-black text-white">Recipe Unlocked!</h1>
        <p className="text-sm text-zinc-400 mt-3">
          <span className="text-amber-400 font-bold">{recipeName}</span> has been added to your purchased recipes.
        </p>
        <div className="h-px bg-zinc-800 my-6" />
        <div className="flex flex-col gap-3">
          <Link href="/dashboard/user/purchased_recipes" className="w-full h-11 flex items-center justify-center gap-2 bg-linear-to-r from-amber-500 to-rose-500 text-zinc-950 font-black text-sm rounded-xl">
            <span>View My Recipes</span>
            <FaArrowRight className="text-xs" />
          </Link>
          <Link href="/recipes" className="w-full h-11 flex items-center justify-center gap-2 bg-zinc-800 border border-zinc-700 text-zinc-300 font-bold text-sm rounded-xl">
            <FaUtensils className="text-xs text-rose-500" />
            Browse More Recipes
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RecipeSuccessPage