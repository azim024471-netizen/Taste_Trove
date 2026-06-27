'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@/lib/auth-client'
import { FaCheck, FaCrown, FaGem, FaUtensils, FaStar, FaFire } from 'react-icons/fa'

const PricingPage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(null)

  const handleCheckout = async (planType) => {
    if (!session?.user) { router.push('/login'); return }
    setLoading(planType)
    try {
      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'premium',
          planType,
          userId: session.user.id,
          userEmail: session.user.email,
          userName: session.user.name,
        }),
      })
      const data = await res.json()
       
      if (data.url) window.location.href = data.url
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-zinc-200 p-4 sm:p-8 md:p-16 flex items-center justify-center font-sans">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-12 relative">

        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-125 h-125 bg-rose-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 left-1/3 w-75 h-75 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="text-center space-y-4 z-10">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full shadow-md">
            <FaUtensils className="text-rose-500 text-xs animate-pulse" />
            <div className="text-xs font-bold tracking-widest uppercase">
              <span className="text-white">Taste</span>
              <span className="text-rose-500">Trove</span>
              <span className="text-zinc-500 ml-1 font-medium">Premium</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Choose Your <span className="bg-linear-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">Cooking Velocity</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-md mx-auto leading-relaxed">
            Unlock unlimited access, showcase your culinary mastery, and stand out in the global community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl z-10">

          <div className="bg-linear-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative transition-all duration-300 hover:border-zinc-700 hover:scale-[1.01]">
            <div>
              <div className="flex items-center justify-between">
                <div className="p-3 bg-rose-500/10 text-rose-400 rounded-2xl border border-rose-500/20">
                  <FaStar className="text-xl" />
                </div>
                <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">Quarterly</span>
              </div>
              <div className="mt-6 space-y-1">
                <h3 className="text-xl font-extrabold text-white tracking-tight">Standard Pro</h3>
                <p className="text-xs text-zinc-400">Perfect plan to get serious with your kitchen journey.</p>
                <div className="pt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white tracking-tight">$14.99</span>
                  <span className="text-sm font-semibold text-zinc-500">/ 3 Months</span>
                </div>
              </div>
              <div className="h-px bg-zinc-800/80 my-6" />
              <ul className="space-y-3.5 text-sm text-zinc-300">
                {['Upload Unlimited Recipes', 'Exclusive Premium Profile Badge', 'Ad-Free Smooth Interface', 'Priority Content Analytics'].map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="p-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><FaCheck size={10} /></span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <button
                onClick={() => handleCheckout('standard')}
                disabled={loading === 'standard'}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 px-4 rounded-xl text-sm font-black transition-all border border-zinc-700/50 disabled:opacity-50 cursor-pointer"
              >
                {loading === 'standard' ? 'Redirecting...' : 'Get Started Now'}
              </button>
            </div>
          </div>

        
          <div className="bg-linear-to-b from-zinc-900 via-zinc-950 to-zinc-950 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl shadow-amber-500/5 relative transition-all duration-300 hover:border-amber-500/60 hover:scale-[1.01]">
            <div className="absolute -top-3.5 right-6 bg-linear-to-r from-amber-500 to-rose-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
              <FaFire size={10} /><span>Best Value & Save 20%</span>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20">
                  <FaGem className="text-xl animate-pulse" />
                </div>
                <span className="text-[10px] uppercase font-black tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">Semi-Annual</span>
              </div>
              <div className="mt-6 space-y-1">
                <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  Ultimate Elite <FaCrown className="text-amber-400 text-sm" />
                </h3>
                <p className="text-xs text-zinc-400">Unleash the full potential of your cooking studio.</p>
                <div className="pt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-amber-400 tracking-tight">$24.99</span>
                  <span className="text-sm font-semibold text-zinc-500">/ 6 Months</span>
                </div>
              </div>
              <div className="h-px bg-zinc-800/80 my-6" />
              <ul className="space-y-3.5 text-sm text-zinc-300">
                {['Everything in Standard Pro Included', 'Verified Chef Badge on Recipes', 'Featured Listings on Main Feed', '24/7 VIP Mentor & Technical Support'].map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="p-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20"><FaCheck size={10} /></span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <button
                onClick={() => handleCheckout('elite')}
                disabled={loading === 'elite'}
                className="w-full bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black py-3 px-4 rounded-xl text-sm font-black shadow-lg transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading === 'elite' ? 'Redirecting...' : 'Upgrade to Elite'}
              </button>
            </div>
          </div>

        </div>

        <p className="text-xs text-zinc-600 font-medium tracking-wide z-10">
          Secure payment powered by Stripe. Cancel or change plan anytime.
        </p>
      </div>
    </div>
  )
}

export default PricingPage