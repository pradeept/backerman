export interface DatabaseAdapter {
  connect: (url: string) => boolean;
  fetchSchema: () => void;
  fetchSchemaAndData: () => void;
  fetchData: () => void;
}
