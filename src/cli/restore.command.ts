import { Command } from "commander";
import type CommandI from "./command.interface";

class RestoreCmd implements CommandI {
  private command: Command;

  constructor() {
    this.command = new Command();
    this.config();
  }

  config() {
    this.command
      .name("restore")
      .description("Restore data and schema to a database.")
      .option("-F, --file", "The sql file to restore")
      .option(
        "-U, --url",
        'Connection url ex: "postgresql://<user>:<password>@<host>:<port>"',
      )
      .option("-D, --db", "Database name");
  }
  getCommand() {
    return this.command;
  }
}

export const restore = new RestoreCmd();
