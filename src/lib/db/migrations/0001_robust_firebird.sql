CREATE TABLE IF NOT EXISTS "bathroom_queue_node_bathroom" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"location" varchar(256),
	"status" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bathroom_queue_node_queue" (
	"id" serial PRIMARY KEY NOT NULL,
	"bathroom_id" integer,
	"user_id" integer,
	"position" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bathroom_queue_node_queue" ADD CONSTRAINT "bathroom_queue_node_queue_bathroom_id_bathroom_queue_node_bathroom_id_fk" FOREIGN KEY ("bathroom_id") REFERENCES "bathroom_queue_node_bathroom"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bathroom_queue_node_queue" ADD CONSTRAINT "bathroom_queue_node_queue_user_id_bathroom_queue_node_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "bathroom_queue_node_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
