/**
 * UserResponse interface is used to collect data from the API
 *
 * @author TuLG
 * @version 1.0
 * @since 2023-06-13
 */



import {IUserDto} from './IUserDto';

export interface UserResponse {
  content: IUserDto[];
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
