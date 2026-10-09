import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Very basic admin check for MVP purposes. In production use RLS or custom claims.
  if (user.email !== 'admin@example.com') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
      </div>
    )
  }

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
             <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
             <p className="mt-2 text-sm text-gray-500">Manage your store products and view recent orders.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Products</h3>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {products?.map((product: any) => (
                    <li key={product.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">${product.price.toFixed(2)} | Inventory: {product.inventory_count}</p>
                      </div>
                    </li>
                  ))}
                  {(!products || products.length === 0) && (
                     <li className="p-4 text-sm text-gray-500 text-center">No products. Add some directly in Supabase for this MVP.</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders (All Users)</h3>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {orders?.map((order: any) => (
                    <li key={order.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-indigo-600">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-gray-500">Amount: ${order.total_amount.toFixed(2)} | Status: {order.status}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </li>
                  ))}
                   {(!orders || orders.length === 0) && (
                     <li className="p-4 text-sm text-gray-500 text-center">No recent orders.</li>
                  )}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
