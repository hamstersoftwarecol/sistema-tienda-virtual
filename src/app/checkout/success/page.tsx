'use client'

import { useEffect, useState, useRef } from 'react'
import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'
import { CheckCircle, Loader2 } from 'lucide-react'
import { createOrderFromCart } from '@/app/actions/order'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function CheckoutSuccessContent() {
  const { items, clearCart, getTotal } = useCartStore()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  // Use a ref to prevent double-firing in StrictMode
  const orderCreatedRef = useRef(false)

  useEffect(() => {
    async function handleSuccess() {
      if (orderCreatedRef.current) return

      const isCrypto = searchParams.get('method') === 'crypto'

      // In a real app, Stripe webhooks handle order creation for fiat
      // For this MVP, we will create the order directly here for both if items exist in state
      if (items.length > 0) {
        orderCreatedRef.current = true
        try {
          const res = await createOrderFromCart(items, getTotal(), isCrypto ? 'Crypto (USDT/USDC)' : 'Credit Card')
          if (res.error) {
            console.error(res.error)
            setStatus('error')
          } else {
             clearCart()
             setStatus('success')
          }
        } catch (error) {
           console.error(error)
           setStatus('error')
        }
      } else {
         // If cart is already empty (e.g., page refresh after success)
         setStatus('success')
      }
    }

    handleSuccess()
  }, [items, clearCart, getTotal, searchParams])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">

          {status === 'loading' && (
            <div className="flex flex-col items-center">
               <Loader2 className="animate-spin h-12 w-12 text-indigo-600 mb-4" />
               <p className="text-gray-600">Finalizando tu orden...</p>
            </div>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h2 className="mt-2 text-2xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h2>
              <p className="text-gray-600 mb-6">
                Gracias por tu compra. Hemos recibido tu orden y ya está visible en tu panel de control.
              </p>
              <div className="flex flex-col space-y-4">
                 <Link href="/dashboard" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Ver Panel
                </Link>
                <Link href="/shop" className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Seguir Comprando
                </Link>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
               <div className="mx-auto h-16 w-16 text-red-500 mb-4 flex items-center justify-center text-4xl">❌</div>
               <h2 className="mt-2 text-2xl font-bold text-gray-900 mb-2">Problema Finalizando la Orden</h2>
               <p className="text-gray-600 mb-6">
                Tu pago pudo haber sido exitoso, pero tuvimos problemas guardando tu orden. Por favor revisa tu panel o contacta soporte.
              </p>
               <Link href="/dashboard" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Ir al Panel
                </Link>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-12 w-12 text-indigo-600" /></div>}>
      <CheckoutSuccessContent />
    </Suspense>
  )
}
