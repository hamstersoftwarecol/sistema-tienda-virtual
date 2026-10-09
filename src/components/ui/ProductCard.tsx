import Image from 'next/image'
import Link from 'next/link'
import { AddToCartButton } from './AddToCartButton'
import { WishlistButton } from './WishlistButton'

interface ProductProps {
  product: {
    id: string
    name: string
    price: number
    image_url: string | null
    description: string | null
  }
}

export function ProductCard({ product }: ProductProps) {
  return (
    <div className="group relative border rounded-lg overflow-hidden flex flex-col bg-white">
      <div className="absolute top-2 right-2 z-20">
        <WishlistButton product={product} />
      </div>
      <div className="aspect-w-3 aspect-h-4 bg-gray-200 sm:aspect-none sm:h-96 relative">
        <Link href={`/shop/${product.id}`}>
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="w-full h-full object-center object-cover sm:w-full sm:h-full group-hover:opacity-75 transition-opacity"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 group-hover:opacity-75 transition-opacity">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </Link>
      </div>
      <div className="flex-1 p-4 space-y-2 flex flex-col z-10">
        <h3 className="text-sm font-medium text-gray-900">
          <Link href={`/shop/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="flex-1 flex flex-col justify-end">
          <p className="text-base font-medium text-gray-900">${product.price.toFixed(2)}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}
