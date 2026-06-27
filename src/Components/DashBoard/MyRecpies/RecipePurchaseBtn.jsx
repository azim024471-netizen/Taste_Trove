'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaCreditCard } from 'react-icons/fa'

const RecipePurchaseBtn = ({ recipe, user }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handlePurchase = async () => {
    if (!user) { router.push('/login'); return }

    setLoading(true)
    try {
      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'recipe',
          recipeId: recipe?._id,
          recipeName: recipe?.recipeName,
          recipeImage: recipe?.recipeImage || "",     
          category: recipe?.category ,       
          preparationTime: recipe?.preparationTime,
          userId: user?.id,
          userEmail: user?.email,
          userName: user?.name,
        }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePurchase}
      disabled={loading}
      className="w-full bg-rose-500 hover:bg-zinc-800 text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50"
    >
      <FaCreditCard className="text-xs" />
      <span>{loading ? 'Redirecting...' : 'Purchase Recipe ($2.99)'}</span>
    </button>
  )
}

export default RecipePurchaseBtn


