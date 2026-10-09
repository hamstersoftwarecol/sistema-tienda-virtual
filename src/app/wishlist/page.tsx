'use client'

import { useWishlistStore } from '@/store/wishlistStore'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()
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
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Mi Lista de Deseos</h1>

          {items.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-xl text-gray-500 mb-6">Tu lista de deseos está vacía.</p>
              <Link href="/shop" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                Explorar Productos
              </Link>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id}>
                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16 relative">
                          {item.image_url ? (
                             <Image src={item.image_url} alt={item.name} fill className="object-cover rounded-md" />
                          ) : (
                            <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center">
                              <span className="text-gray-400 text-xs">Sin img</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                           <Link href={`/shop/${item.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                             {item.name}
                           </Link>
                           <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                         <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                         >
                            <Trash2 className="h-5 w-5" />
                         </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
