import { Command } from "commander";
import { backupSchema } from "./validators/backup.schema";
import { ZodError } from "zod";
import { errorColor } from "../utils/errorColor";

export const configureBackupCommand = (): Command => {
  const backup = new Command("backup");
  backup
    .name("backup")
    .description("Backup data and schema from a database.")
    .option(
      "-U, --url",
      'Connection url ex: "postgresql://<user>:<password>@<host>:<port>"'
    )
    .option("-D, --db", "Database name");

  backup.configureOutput({
    writeOut: (str) => process.stdout.write(`[OUT] ${str}`),
    writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
    // Output errors in red.
    outputError: (str, write) => write(errorColor(str)),
  });

  // validate argument values
  const options = backup.opts();
  try {
    const validatedOptions = backupSchema.parse(options);
  } catch (err) {
    if (err instanceof ZodError) {
      err.issues.forEach((issue) => {
        backup.error(issue.message);
      });
    } else {
      backup.error("Unknown validation error");
    }
  }

  return backup;
};

// backerman backup --provider <pgsql|mysql|sqlite> --user <username> --password <password> --url <db_url> --db <dbname>
// connecting to the db...
// connected!
// what do you want to backup ?
//  - schema only
//  - data only
//  - schema and data
