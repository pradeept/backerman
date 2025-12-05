import * as z from "zod";

export const backupSchema = z.object({
  url: z
    .string()
    .regex(
      /^(postgres|postgresql|mysql|mariadb|sqlite|mssql|oracle):\/\/([^:\/]+):(\d+)$/,
      "Invalid DB URL. Format must be <engine>://<host>:<port>",
    )
    .max(60, { error: "DB url string can't be greater than 60 chars" }),
  db: z
    .string("Database name is required")
    .max(10, { error: "Max 10 chars allowed" }),
  username: z
    .string("Please set env DB_USERNAME")
    .max(40, { error: "Username too long" }),
  password: z
    .string("Please set env DB_PASSWORD")
    .max(40, { error: "Password too long" }),
});
