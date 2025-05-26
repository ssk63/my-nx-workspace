CREATE TABLE "personal_voices" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "tenant_id" uuid NOT NULL,
    "key" text NOT NULL,
    "name" text NOT NULL,
    "enabled" boolean NOT NULL DEFAULT true,
    "profile" jsonb NOT NULL,
    "tone_of_voice" jsonb NOT NULL,
    "audience" jsonb NOT NULL,
    "fine_tuning" jsonb NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "personal_voices_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE,
    CONSTRAINT "personal_voices_tenant_key_unique" UNIQUE("tenant_id", "key")
); 