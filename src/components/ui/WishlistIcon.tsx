'use client'

import { useWishlistStore } from '@/store/wishlistStore'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

export function WishlistIcon() {
  const items = useWishlistStore((state) => state.items)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const itemCount = items.length

  return (
    <div className="relative">
      <Heart className="h-6 w-6" />
      {mounted && itemCount > 0 && (
        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform bg-red-500 rounded-full">
          {itemCount}
        </span>
      )}
    </div>
  )
}
