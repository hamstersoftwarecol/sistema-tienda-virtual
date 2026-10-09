'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function FiatCheckoutPage() {
  const { items } = useCartStore()
  const router = useRouter()

  useEffect(() => {
    const createCheckoutSession = async () => {
      if (items.length === 0) {
        router.push('/cart')
        return
      }

      try {
        const response = await fetch('/api/checkout/stripe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ items }),
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        if (data.url) {
          window.location.href = data.url
        }
      } catch (error) {
        console.error('Error creating checkout session:', error)
        router.push('/cart')
      }
    }

    createCheckoutSession()
  }, [items, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="mx-auto h-12 w-12 text-indigo-600 animate-spin" />
        <h2 className="mt-4 text-xl font-semibold text-gray-900">Redirecting to secure checkout...</h2>
        <p className="mt-2 text-sm text-gray-500">Please wait while we prepare your payment session.</p>
      </div>
    </div>
  )
}
