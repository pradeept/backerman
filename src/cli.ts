import { program } from "commander";
import { version } from "../package.json";

export const cli = () => {
  program
    .name("backerman")
    .description("A database backup and restore utility")
    .version(version);

    

  program.parse();
  return program
};
