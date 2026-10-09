'use client'

import { useWishlistStore } from '@/store/wishlistStore'
import { Heart } from 'lucide-react'
import { useState, useEffect } from 'react'

interface WishlistButtonProps {
  product: {
    id: string
    name: string
    price: number
    image_url: string | null
  }
}

export function WishlistButton({ product }: WishlistButtonProps) {
  const { addItem, removeItem, isInWishlist } = useWishlistStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
       <button className="p-2 rounded-full bg-gray-100 text-gray-400">
         <Heart className="h-5 w-5" />
       </button>
    )
  }

  const isSaved = isInWishlist(product.id)

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isSaved) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  return (
    <button
      onClick={toggleWishlist}
      className={`p-2 rounded-full transition-colors ${isSaved ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
      aria-label="Add to wishlist"
    >
      <Heart className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
    </button>
  )
}
