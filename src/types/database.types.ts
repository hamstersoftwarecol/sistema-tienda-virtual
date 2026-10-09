export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
          price: number
          image_url: string | null
          category: string | null
          inventory_count: number
          is_digital: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description?: string | null
          price: number
          image_url?: string | null
          category?: string | null
          inventory_count?: number
          is_digital?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
          price?: number
          image_url?: string | null
          category?: string | null
          inventory_count?: number
          is_digital?: boolean
        }
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          created_at: string
          user_id: string
          status: string
          total_amount: number
          payment_method: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          status?: string
          total_amount: number
          payment_method?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          status?: string
          total_amount?: number
          payment_method?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price_at_time: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          price_at_time: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price_at_time?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
    }
  }
}
