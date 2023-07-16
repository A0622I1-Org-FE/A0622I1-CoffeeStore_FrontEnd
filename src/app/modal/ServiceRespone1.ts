import {IServices} from './IServices';
import {IServiceDto1} from './IServiceDto1';

export interface ServiceRespone1 {
  content: IServiceDto1[];
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
