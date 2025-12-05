import { Command } from "commander";
import { backupService, type Options } from "../core/backup.service";
import { output } from "../utils/configOutput";
import type CommandI from "./command.interface";
import { backupSchema } from "./validators/backup.schema";
import { ZodError } from "zod";
import { select } from "@inquirer/prompts";
import type { Engine } from "../types/engines";
import type { Mode } from "../types/modes";
import type { StorageType } from "../types/storages";

class BackupCmd implements CommandI {
  private command: Command;
  constructor() {
    this.command = new Command("backup");
    this.config();
  }

  config() {
    this.command
      .name("backup")
      .description("Backup data and schema from a database.")
      .option(
        "-U, --url <url>",
        'Connection url ex: "postgresql://<host>:<port>" , do not include username and password',
      )
      .option("-D, --db <db>", "Database name")
      .configureOutput(output)
      .action(this.run.bind(this));
    // we need to bind this to run() so that when
    // commander calls it, run should be able to access
    // 'this' instance. More at: Instance Methods (MDN)
  }

  async run(opts: any) {
    const options = {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      ...opts,
    };
    const validatedOpts = validate(options, this.command);
    const { databaseEngine, mode, storageType } = await getUserSelections();
    await backupService(
      validatedOpts as Options,
      databaseEngine,
      mode,
      storageType,
    );
  }

  getCommand() {
    return this.command;
  }
}
export const backup = new BackupCmd();

// helpers

const validate = (opts: any, command: Command) => {
  const options = opts;
  try {
    const validatedOptions = backupSchema.parse(options);
    return validatedOptions;
  } catch (err) {
    if (err instanceof ZodError) {
      err.issues.forEach((issue) => {
        command.error(issue.message);
      });
    } else {
      command.error("Unknown validation error");
    }
    return;
  }
};

const getUserSelections = async () => {
  const databaseEngine: Engine = await select({
    message: "Select a DB engine",
    choices: ["PostgreSQL", "Mysql", "MariaDB", "SQLite", "msSQL", "Oracle"],
  });
  const mode: Mode = await select({
    message: "What do you want to Backup?",
    choices: [
      { name: "Schema only", value: "schema" },
      { name: "Schema and Data", value: "complete" },
      { name: "Data only", value: "data" },
    ],
  });
  const storageType: StorageType = await select({
    message: "Where do you want to store?",
    choices: [
      { name: "Local Storage", value: "local" },
      { name: "S3 bucket", value: "s3" },
    ],
  });

  return { databaseEngine, mode, storageType };
};
