'use client'

import { useCartStore } from '@/store/cartStore'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-xl text-gray-500 mb-6">Your cart is empty.</p>
              <Link href="/shop" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
              <div className="lg:col-span-7">
                <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200 bg-white shadow rounded-lg px-4 sm:px-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        {item.image_url ? (
                          <div className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32 relative overflow-hidden">
                             <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-24 h-24 rounded-md bg-gray-200 sm:w-32 sm:h-32 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No image</span>
                          </div>
                        )}
                      </div>

                      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link href={`/shop/${item.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                                  {item.name}
                                </Link>
                              </h3>
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <div className="flex items-center border border-gray-300 rounded-md w-max">
                              <button
                                type="button"
                                className="p-2 text-gray-600 hover:text-gray-500"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-2 text-sm font-medium text-gray-900">{item.quantity}</span>
                              <button
                                type="button"
                                className="p-2 text-gray-600 hover:text-gray-500"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="absolute top-0 right-0">
                              <button
                                type="button"
                                className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                                onClick={() => removeItem(item.id)}
                              >
                                <span className="sr-only">Remove</span>
                                <Trash2 className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order summary */}
              <div className="mt-16 bg-white rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 shadow">
                <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                  Order summary
                </h2>

                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Order total</dt>
                    <dd className="text-base font-medium text-gray-900">${getTotal().toFixed(2)}</dd>
                  </div>
                </dl>

                <div className="mt-6 space-y-4">
                  <p className="text-sm text-gray-500 text-center mb-4">You must be logged in to checkout.</p>
                  <Link href="/checkout/fiat" className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 block text-center">
                    Checkout with Card
                  </Link>
                  <Link href="/checkout/crypto" className="w-full bg-slate-800 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-slate-500 block text-center">
                    Checkout with Crypto (USDT/USDC)
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
