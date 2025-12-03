import { program } from "commander";
import pkg from "../../package.json" with { type: "json" }; // with to specify the file type
import { restore } from "./restore.command.ts";
import { errorColor } from "../utils/errorColor.ts";
import { output } from "../utils/configOutput.ts";
import { backup } from "./backup.command.ts";
const version = pkg.version;

export const cli = () => {
  program
    .name("backerman")
    .description("A database backup and restore utility for cli junkies!")
    .version(version)
    .usage("[command] [options]")
    .configureOutput(output);

  program.addCommand(backup.getCommand());

  program.addCommand(restore.getCommand());

  program.parse();
  return program;
};
