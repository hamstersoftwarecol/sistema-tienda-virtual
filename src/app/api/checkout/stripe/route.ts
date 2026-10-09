import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { CartItem } from '@/store/cartStore'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items } = body as { items: CartItem[] }

    if (!items || items.length === 0) {
      return new NextResponse("Items are required", { status: 400 })
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image_url ? [item.image_url] : [],
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
      },
      quantity: item.quantity,
    }))

    const origin = req.headers.get('origin') || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&method=fiat`,
      cancel_url: `${origin}/cart`,
      metadata: {
        cartItems: JSON.stringify(items.map(item => ({ id: item.id, quantity: item.quantity }))),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("[STRIPE_CHECKOUT]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
