export interface DatabaseAdapter {
  connect: (url: string) => Promise<boolean>;
  fetchSchema: () => void;
  fetchSchemaAndData: () => void;
  fetchData: () => void;
}
