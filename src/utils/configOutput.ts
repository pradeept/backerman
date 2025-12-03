import { errorColor } from "./errorColor";

export const output = {
  writeOut: (str: any) => process.stdout.write(`[OUT] ${str}`),
  writeErr: (str: any) => process.stdout.write(`[ERR] ${str}`),
  // Output errors in red.
  outputError: (str: any, write: any) => write(errorColor(str)),
};
