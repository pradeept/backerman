import type { DatabaseAdapter } from "./interfaces/db.adapter";

export class PGAdapter implements DatabaseAdapter {
  private connection:null|
  constructor() {}
  async connect(url: string) {
    //
  }
  fetchData() {}
  fetchSchema() {}
  fetchSchemaAndData() {}
}
