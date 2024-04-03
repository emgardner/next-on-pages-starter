DELETE FROM posts;
--> statement-breakpoint
ALTER TABLE posts ADD `userId` text NOT NULL REFERENCES user(id);
--> statement-breakpoint
