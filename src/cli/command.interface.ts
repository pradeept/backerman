import type { Command } from "commander";

export default interface CommandI {
  config: () => void;
  getCommand: () => Command;
}
