import { Command } from "commander";
import { backupService } from "../core/backup.service";
import { output } from "../utils/configOutput";
import type CommandI from "./command.interface";

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
        'Connection url ex: "postgresql://<user>:<password>@<host>:<port>"',
      )
      .option("-D, --db <db>", "Database name")
      .configureOutput(output)
      .action(backupService);
  }

  getCommand() {
    return this.command;
  }
}
export const backup = new BackupCmd();

// backerman backup --provider <pgsql|mysql|sqlite> --user <username> --password <password> --url <db_url> --db <dbname>
// connecting to the db...
// connected!
// what do you want to backup ?
//  - schema only
//  - data only
//  - schema and data
