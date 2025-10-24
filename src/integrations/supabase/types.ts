export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blog_comments: {
        Row: {
          blog_post_id: string
          comment_text: string
          created_at: string
          id: string
          updated_at: string
          user_email: string
          user_name: string
        }
        Insert: {
          blog_post_id: string
          comment_text: string
          created_at?: string
          id?: string
          updated_at?: string
          user_email: string
          user_name: string
        }
        Update: {
          blog_post_id?: string
          comment_text?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_email?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_likes: {
        Row: {
          blog_post_id: string
          created_at: string
          id: string
          user_identifier: string
        }
        Insert: {
          blog_post_id: string
          created_at?: string
          id?: string
          user_identifier: string
        }
        Update: {
          blog_post_id?: string
          created_at?: string
          id?: string
          user_identifier?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_likes_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author: string
          category: string
          content: string
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          likes_count: number
          published: boolean
          shares_count: number
          slug: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          category: string
          content: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          likes_count?: number
          published?: boolean
          shares_count?: number
          slug?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          likes_count?: number
          published?: boolean
          shares_count?: number
          slug?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      books: {
        Row: {
          author: string
          category: string
          cover_image_url: string | null
          created_at: string
          description: string | null
          id: string
          isbn: string | null
          pdf_file_url: string | null
          price: number | null
          publication_year: number | null
          rating: number | null
          title: string
          updated_at: string
          whatsapp_link: string | null
        }
        Insert: {
          author: string
          category: string
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          isbn?: string | null
          pdf_file_url?: string | null
          price?: number | null
          publication_year?: number | null
          rating?: number | null
          title: string
          updated_at?: string
          whatsapp_link?: string | null
        }
        Update: {
          author?: string
          category?: string
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          isbn?: string | null
          pdf_file_url?: string | null
          price?: number | null
          publication_year?: number | null
          rating?: number | null
          title?: string
          updated_at?: string
          whatsapp_link?: string | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          category: string
          classification: string | null
          course_date: string | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          difficulty_level: string | null
          duration_days: number | null
          duration_hours: number | null
          id: string
          instructor: string
          prerequisites: string | null
          price: number | null
          title: string
          updated_at: string
          whatsapp_link: string | null
        }
        Insert: {
          category: string
          classification?: string | null
          course_date?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          duration_days?: number | null
          duration_hours?: number | null
          id?: string
          instructor: string
          prerequisites?: string | null
          price?: number | null
          title: string
          updated_at?: string
          whatsapp_link?: string | null
        }
        Update: {
          category?: string
          classification?: string | null
          course_date?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          duration_days?: number | null
          duration_hours?: number | null
          id?: string
          instructor?: string
          prerequisites?: string | null
          price?: number | null
          title?: string
          updated_at?: string
          whatsapp_link?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
