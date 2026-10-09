import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProductCard } from '@/components/ui/ProductCard'
import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .limit(4)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Welcome to </span>
              <span className="block text-indigo-600 xl:inline">CryptoStore</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Buy physical, digital, and services with Fiat or Crypto (USDT/USDC).
            </p>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products?.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {!products?.length && (
                <p className="text-gray-500 col-span-full text-center">No products found. Add some to your database!</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
