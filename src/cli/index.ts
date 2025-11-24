import { program } from "commander";
import pkg from "../../package.json" with {type: "json"}; // with to specify the file type 
import { configureBackupCommand } from "./backup.command";

const version = pkg.version

export const cli = () => {
  program
    .name("backerman")
    .description("A database backup and restore utility")
    .version(version);
  
  configureBackupCommand(program)

  program.parse();
  return program;
};
