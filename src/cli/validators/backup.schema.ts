import * as z from "zod";

export const backupSchema = z.object({
  url: z
    .string("DB url is required")
    .max(60, { error: "DB url string can't be greater than 60 chars" }),
  db: z
    .string("Database name is required")
    .max(10, { error: "Max 10 chars allowed" }),
});
