
export class DataPaginationEvent {
  page?: number;
  pageSize?: number;
}

export class SelectItemEvent <T> {
  item? : T;
}
