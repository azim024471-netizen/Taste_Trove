import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import Link from 'next/link'
import { FaCheckCircle, FaCrown, FaUtensils, FaArrowRight } from 'react-icons/fa'
import { keepPaymentData, upgradeUserType } from '@/lib/api_actions/payment'

const PremiumSuccessPage = async ({ searchParams }) => {

  const resolvedParams = await searchParams
  const sessionId = resolvedParams?.session_id

  if (!sessionId) redirect('/get_premium')

  const session = await stripe.checkout.sessions.retrieve(sessionId)
  if (session.status !== 'complete') redirect('/get_premium')

  const { userId, userEmail, userName, planType } = session.metadata


  
  
  upgradeUserType(userId,planType)


  const paymentData = {
     type: 'premium',
      planType,
      userId, userEmail, userName,
      amount: planType === 'elite' ? 24.99 : 14.99,
      transactionId: session.subscription || session.id, 
      paymentStatus: 'completed',
      stripeSessionId: sessionId,
  }


  keepPaymentData(paymentData)


  
  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center z-10">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-6">
          <FaCheckCircle className="text-5xl" />
        </div>
        <h1 className="text-2xl font-black text-white">Payment Successful!</h1>
        <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
          Welcome, <span className="text-white font-bold">{userName}</span>! Upgraded to{' '}
          <span className="text-amber-400 font-bold">{planType === 'elite' ? 'Ultimate Elite' : 'Standard Pro'}</span>.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-xs font-bold">
          <FaCrown size={10} /> Premium Active
        </div>
        <div className="h-px bg-zinc-800 my-6" />
        <div className="flex flex-col gap-3">
          <Link href="/dashboard" className="w-full h-11 flex items-center justify-center gap-2 bg-linear-to-r from-amber-500 to-rose-500 text-zinc-950 font-black text-sm rounded-xl">
            <span>Go to Dashboard</span>
            <FaArrowRight className="text-xs" />
          </Link>
          <Link href="/recipes" className="w-full h-11 flex items-center justify-center gap-2 bg-zinc-800 border border-zinc-700 text-zinc-300 font-bold text-sm rounded-xl">
            <FaUtensils className="text-xs text-rose-500" /> Browse Recipes
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PremiumSuccessPage