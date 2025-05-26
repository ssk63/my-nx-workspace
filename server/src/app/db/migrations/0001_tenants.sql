-- Create tenants table
CREATE TABLE "tenants" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "name" text NOT NULL,
    "slug" text NOT NULL,
    "is_active" boolean NOT NULL DEFAULT true,
    "settings" jsonb,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "tenants_slug_unique" UNIQUE("slug")
);

-- Modify users table to include tenant information
ALTER TABLE users
    ADD COLUMN tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    ADD COLUMN role text NOT NULL DEFAULT 'member',
    ADD COLUMN is_active boolean NOT NULL DEFAULT true;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_tenant_id ON users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role); 