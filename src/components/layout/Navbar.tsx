import Link from 'next/link'
import { User } from 'lucide-react'
import { CartIcon } from '@/components/ui/CartIcon'
import { WishlistIcon } from '@/components/ui/WishlistIcon'

export function Navbar() {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              CryptoStore
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link href="/shop" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium">
              Tienda
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/wishlist" className="text-gray-500 hover:text-gray-900">
              <WishlistIcon />
            </Link>
            <Link href="/cart" className="text-gray-500 hover:text-gray-900">
              <CartIcon />
            </Link>
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-900">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
