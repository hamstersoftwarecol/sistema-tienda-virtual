'use server'

import { createClient } from '@/lib/supabase-server'
import { CartItem } from '@/store/cartStore'

export async function createOrderFromCart(items: CartItem[], totalAmount: number, paymentMethod: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'El usuario debe iniciar sesión para crear una orden.' }
  }

  // 1. Create the order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      total_amount: totalAmount,
      status: 'completada',
      payment_method: paymentMethod,
    } as any)
    .select()
    .single()

  if (orderError || !order) {
    console.error("Error al crear la orden", orderError)
    return { error: 'Hubo un fallo al crear la orden.' }
  }

  // 2. Create the order items
  const orderItemsToInsert = items.map(item => ({
    order_id: (order as any).id,
    product_id: item.id,
    quantity: item.quantity,
    price_at_time: item.price
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItemsToInsert as any)

  if (itemsError) {
    console.error("Error al agregar artículos a la orden", itemsError)
    return { error: 'Hubo un fallo al agregar los artículos a la orden.' }
  }

  // 3. Decrease inventory for each item
  for (const item of items) {
    // Note: In a highly concurrent production environment, a database function or RPC is preferred to avoid race conditions.
    // We fetch the current inventory, then decrement.
    const { data: product } = await supabase
      .from('products')
      .select('inventory_count')
      .eq('id', item.id)
      .single()

    if (product && typeof (product as any).inventory_count === 'number') {
      const newCount = Math.max(0, (product as any).inventory_count - item.quantity)
      // Because we haven't defined the exact Supabase types properly everywhere, we'll cast to any for the builder chain
      const clientAny: any = supabase;
      await clientAny
        .from('products')
        .update({ inventory_count: newCount })
        .eq('id', item.id)
    }
  }

  return { success: true, orderId: (order as any).id }
}
