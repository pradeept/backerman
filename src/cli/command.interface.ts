import type { Command } from "commander";

export default interface CommandI {
  // config: () => void; private
  // run: () => void; private
  getCommand: () => Command;
}
