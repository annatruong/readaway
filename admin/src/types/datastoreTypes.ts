interface Filter {
  field: string;
  operator: '=' | '<' | '<=' | '>' | '>=';
  value: any;
}

export type DatastoreParams = {
  namespace: string;
  kind: string;
  id?: string | number;
  filter?: Filter;
  entity?: object;
};
