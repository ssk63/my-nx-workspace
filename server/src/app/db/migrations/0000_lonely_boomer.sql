CREATE TABLE "personal_voices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"name" text NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	"profile" json NOT NULL,
	"tone_of_voice" json NOT NULL,
	"audience" json NOT NULL,
	"fine_tuning" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "personal_voices_key_unique" UNIQUE("key")
);
