import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProductCard } from '@/components/ui/ProductCard'
import { supabase } from '@/lib/supabase'


export default async function ShopPage() {
  const { data: products } = await supabase
    .from('products')
    .select('*')

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">Todos los Productos</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
             {!products?.length && (
                <p className="text-gray-500 col-span-full text-center py-12">No hay productos disponibles por el momento.</p>
              )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
