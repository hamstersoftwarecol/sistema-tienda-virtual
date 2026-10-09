'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useState } from 'react'

export default function FiatCheckoutPage() {
  const { items } = useCartStore()
  const router = useRouter()

  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const checkAuthAndCreateSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        setErrorMsg('Debes iniciar sesión para proceder al pago.')
        setTimeout(() => router.push('/auth/login'), 2000)
        return
      }

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
          throw new Error('Error en la red')
        }

        const data = await response.json()
        if (data.url) {
          window.location.href = data.url
        }
      } catch (error) {
        console.error('Error creando sesión de pago:', error)
        setErrorMsg('Hubo un fallo al inicializar el pago. Volviendo al carrito...')
        setTimeout(() => router.push('/cart'), 2000)
      }
    }

    checkAuthAndCreateSession()
  }, [items, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {errorMsg ? (
          <div>
            <h2 className="text-xl font-semibold text-red-600">{errorMsg}</h2>
          </div>
        ) : (
          <>
            <Loader2 className="mx-auto h-12 w-12 text-indigo-600 animate-spin" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Redirigiendo a pasarela segura...</h2>
            <p className="mt-2 text-sm text-gray-500">Por favor, espera mientras preparamos tu sesión de pago.</p>
          </>
        )}
      </div>
    </div>
  )
}
