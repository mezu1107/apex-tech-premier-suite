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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string | null
          content: string | null
          cover_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          meta_description: string | null
          meta_keywords: string | null
          meta_title: string | null
          og_description: string | null
          og_image: string | null
          og_title: string | null
          published: boolean
          published_at: string | null
          slug: string
          sort_order: number
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          content?: string | null
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          published?: boolean
          published_at?: string | null
          slug: string
          sort_order?: number
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          content?: string | null
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          published?: boolean
          published_at?: string | null
          slug?: string
          sort_order?: number
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          is_read: boolean
          meeting_type: string | null
          name: string
          notes: string | null
          phone: string | null
          preferred_date: string | null
          preferred_time: string | null
          service: string | null
          status: string
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          meeting_type?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          service?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          meeting_type?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          service?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          category: string | null
          client: string | null
          cover_url: string | null
          created_at: string
          id: string
          link_url: string | null
          published: boolean
          results: string | null
          sort_order: number
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          client?: string | null
          cover_url?: string | null
          created_at?: string
          id?: string
          link_url?: string | null
          published?: boolean
          results?: string | null
          sort_order?: number
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          client?: string | null
          cover_url?: string | null
          created_at?: string
          id?: string
          link_url?: string | null
          published?: boolean
          results?: string | null
          sort_order?: number
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          name: string
          published: boolean
          sort_order: number
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          published?: boolean
          sort_order?: number
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          published?: boolean
          sort_order?: number
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
          subject?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          subject?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          id: string
          published: boolean
          question: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          id?: string
          published?: boolean
          question: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          id?: string
          published?: boolean
          question?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          source?: string | null
        }
        Relationships: []
      }
      page_seo: {
        Row: {
          canonical_url: string | null
          created_at: string
          id: string
          label: string
          meta_description: string | null
          meta_keywords: string | null
          meta_title: string | null
          noindex: boolean
          og_description: string | null
          og_image: string | null
          og_title: string | null
          path: string
          updated_at: string
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string
          id?: string
          label: string
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          noindex?: boolean
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          path: string
          updated_at?: string
        }
        Update: {
          canonical_url?: string | null
          created_at?: string
          id?: string
          label?: string
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          noindex?: boolean
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          path?: string
          updated_at?: string
        }
        Relationships: []
      }
      portfolio: {
        Row: {
          category: string
          created_at: string
          description: string
          featured: boolean
          id: string
          image_url: string | null
          link_url: string | null
          published: boolean
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string
          featured?: boolean
          id?: string
          image_url?: string | null
          link_url?: string | null
          published?: boolean
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          featured?: boolean
          id?: string
          image_url?: string | null
          link_url?: string | null
          published?: boolean
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      pricing_plans: {
        Row: {
          created_at: string
          cta_label: string | null
          cta_url: string | null
          description: string | null
          featured: boolean
          features: string[]
          id: string
          name: string
          price: string
          price_period: string | null
          published: boolean
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          cta_label?: string | null
          cta_url?: string | null
          description?: string | null
          featured?: boolean
          features?: string[]
          id?: string
          name: string
          price?: string
          price_period?: string | null
          published?: boolean
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          cta_label?: string | null
          cta_url?: string | null
          description?: string | null
          featured?: boolean
          features?: string[]
          id?: string
          name?: string
          price?: string
          price_period?: string | null
          published?: boolean
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      process_steps: {
        Row: {
          created_at: string
          description: string | null
          id: string
          published: boolean
          sort_order: number
          step_number: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          published?: boolean
          sort_order?: number
          step_number?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          published?: boolean
          sort_order?: number
          step_number?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          budget: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
          phone: string | null
          service: string | null
          status: string
          timeline: string | null
          updated_at: string
        }
        Insert: {
          budget?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
          phone?: string | null
          service?: string | null
          status?: string
          timeline?: string | null
          updated_at?: string
        }
        Update: {
          budget?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          phone?: string | null
          service?: string | null
          status?: string
          timeline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          banner_image: string | null
          created_at: string
          description: string
          faq: Json
          featured: boolean
          features: string[]
          gradient: string
          hero_image: string | null
          icon: string
          id: string
          long_description: string | null
          meta_description: string | null
          meta_keywords: string | null
          meta_title: string | null
          og_description: string | null
          og_image: string | null
          og_title: string | null
          pricing_tiers: Json
          process: Json
          published: boolean
          slug: string | null
          sort_order: number
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          banner_image?: string | null
          created_at?: string
          description: string
          faq?: Json
          featured?: boolean
          features?: string[]
          gradient?: string
          hero_image?: string | null
          icon?: string
          id?: string
          long_description?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          pricing_tiers?: Json
          process?: Json
          published?: boolean
          slug?: string | null
          sort_order?: number
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          banner_image?: string | null
          created_at?: string
          description?: string
          faq?: Json
          featured?: boolean
          features?: string[]
          gradient?: string
          hero_image?: string | null
          icon?: string
          id?: string
          long_description?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          pricing_tiers?: Json
          process?: Json
          published?: boolean
          slug?: string | null
          sort_order?: number
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      stats: {
        Row: {
          created_at: string
          id: string
          label: string
          published: boolean
          sort_order: number
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
          published?: boolean
          sort_order?: number
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
          published?: boolean
          sort_order?: number
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string
          created_at: string
          email: string | null
          id: string
          linkedin_url: string | null
          name: string
          photo_url: string | null
          published: boolean
          role_title: string
          sort_order: number
          twitter_url: string | null
          updated_at: string
        }
        Insert: {
          bio?: string
          created_at?: string
          email?: string | null
          id?: string
          linkedin_url?: string | null
          name: string
          photo_url?: string | null
          published?: boolean
          role_title?: string
          sort_order?: number
          twitter_url?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string
          created_at?: string
          email?: string | null
          id?: string
          linkedin_url?: string | null
          name?: string
          photo_url?: string | null
          published?: boolean
          role_title?: string
          sort_order?: number
          twitter_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          name: string
          published: boolean
          quote: string
          role_title: string
          sort_order: number
          stars: number
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          name: string
          published?: boolean
          quote: string
          role_title?: string
          sort_order?: number
          stars?: number
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          name?: string
          published?: boolean
          quote?: string
          role_title?: string
          sort_order?: number
          stars?: number
          updated_at?: string
        }
        Relationships: []
      }
      tracking_pixels: {
        Row: {
          body_code: string | null
          created_at: string
          enabled: boolean
          head_code: string | null
          id: string
          label: string | null
          pixel_id: string | null
          provider: string
          sort_order: number
          updated_at: string
          verification_code: string | null
        }
        Insert: {
          body_code?: string | null
          created_at?: string
          enabled?: boolean
          head_code?: string | null
          id?: string
          label?: string | null
          pixel_id?: string | null
          provider: string
          sort_order?: number
          updated_at?: string
          verification_code?: string | null
        }
        Update: {
          body_code?: string | null
          created_at?: string
          enabled?: boolean
          head_code?: string | null
          id?: string
          label?: string | null
          pixel_id?: string | null
          provider?: string
          sort_order?: number
          updated_at?: string
          verification_code?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
