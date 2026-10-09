'use server'

import { createClient } from '@/lib/supabase-server'
import { CartItem } from '@/store/cartStore'

export async function createOrderFromCart(items: CartItem[], totalAmount: number, paymentMethod: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'User must be logged in to create an order.' }
  }

  // 1. Create the order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      total_amount: totalAmount,
      status: 'completed',
      payment_method: paymentMethod,
    } as any)
    .select()
    .single()

  if (orderError || !order) {
    console.error("Order creation error", orderError)
    return { error: 'Failed to create order.' }
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
    console.error("Order items creation error", itemsError)
    return { error: 'Failed to add items to order.' }
  }

  return { success: true, orderId: (order as any).id }
}
