import { ZodError } from "zod";
import { backupSchema } from "../cli/validators/backup.schema";
import { backup as b } from "../cli/backup.command";
import type { Command } from "commander";
import { select } from "@inquirer/prompts";
import { PGAdapter } from "../adapters/pgsql.adapter";
import type { Mode } from "../types/modes";
import type { Engine } from "../types/engines";
import type { StorageType } from "../types/storages";

export type Options = {
  url: string;
  db: string;
  username: string;
  password: string;
};

export const backupService = async (
  opts: Options,
  dbEngine: Engine,
  mode: Mode,
  storageType: StorageType,
) => {
  const backup = b.getCommand();

  console.log("opts: ", opts);
  console.log("engine: ", dbEngine);
  console.log("mode: ", mode);
  console.log("storageType: ", storageType);

  // let dbAdapter;

  // switch (dataBaseEngine) {
  //   case "PostgreSQL":
  //     dbAdapter = new PGAdapter();
  //     break;
  //   default:
  //     backup.error("Ivalid choice");
  //     break;
  // }
  // if (dbAdapter && validatedOpts) {
  //   const isConnected = await dbAdapter.connect(validatedOpts.url);
  //   if (!isConnected) {
  //     backup.error("Failed to connect to the DB, Please check your URL");
  //     return;
  //   }
  //   const data =
  // }
};
