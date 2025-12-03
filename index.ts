#!/usr/bin/env bun

import { cli } from "./src/cli/index.ts";

const main = async () => {
  const program = await cli();
};

main();
