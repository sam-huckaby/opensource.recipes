export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      recipes: {
        Row: {
          owner_uuid: string
          title: string
          description: string | null
          steps: Json | null
          tags: Json | null
          created_at: string
          updated_at: string
          id: string
        }
        Insert: {
          owner_uuid: string
          title: string
          description?: string | null
          steps?: Json | null
          tags?: Json | null
          created_at?: string
          updated_at?: string
          id?: string
        }
        Update: {
          owner_uuid?: string
          title?: string
          description?: string | null
          steps?: Json | null
          tags?: Json | null
          created_at?: string
          updated_at?: string
          id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
