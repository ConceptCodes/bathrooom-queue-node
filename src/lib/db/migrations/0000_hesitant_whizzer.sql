CREATE TABLE IF NOT EXISTS "bathroom_queue_node_session" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"token" varchar(256),
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bathroom_queue_node_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"role" text DEFAULT 'USER' NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"refresh_token" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "bathroom_queue_node_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bathroom_queue_node_session" ADD CONSTRAINT "bathroom_queue_node_session_user_id_bathroom_queue_node_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "bathroom_queue_node_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
