import {IServices} from './IServices';

export interface ServiceRespone {
  content: IServices[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
