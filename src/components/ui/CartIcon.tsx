'use client'

import { useCartStore } from '@/store/cartStore'
import { ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'

export function CartIcon() {
  const items = useCartStore((state) => state.items)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="relative">
      <ShoppingCart className="h-6 w-6" />
      {mounted && itemCount > 0 && (
        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform bg-indigo-600 rounded-full">
          {itemCount}
        </span>
      )}
    </div>
  )
}
