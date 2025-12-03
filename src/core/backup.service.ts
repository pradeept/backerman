import { ZodError } from "zod";
import { backupSchema } from "../cli/validators/backup.schema";
import { backup as b } from "../cli/backup.command";
import type { Command } from "commander";

export const backupService = async (opts: any) => {
  const backup = b.getCommand();
  validate(opts, backup);
};

const validate = (opts: any, command: Command) => {
  // validate argument values
  const options = opts;
  try {
    const validatedOptions = backupSchema.parse(options);
  } catch (err) {
    if (err instanceof ZodError) {
      err.issues.forEach((issue) => {
        // backup.error(issue.message);
        command.error(issue.message);
      });
    } else {
      command.error("Unknown validation error");
    }
  }
};
