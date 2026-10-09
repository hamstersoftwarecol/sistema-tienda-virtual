import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistItem {
  id: string
  name: string
  price: number
  image_url: string | null
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  isInWishlist: (id: string) => boolean
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const { items } = get()
        if (!items.find((item) => item.id === newItem.id)) {
          set({ items: [...items, newItem] })
        }
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },
      isInWishlist: (id) => {
        const { items } = get()
        return items.some((item) => item.id === id)
      }
    }),
    {
      name: 'wishlist-storage',
    }
  )
)
