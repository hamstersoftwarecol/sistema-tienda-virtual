'use client'

import { useCartStore } from '@/store/cartStore'
import { ShoppingCart } from 'lucide-react'

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    image_url: string | null
  }
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        addItem(product)
      }}
      className="mt-4 w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to Cart
    </button>
  )
}
