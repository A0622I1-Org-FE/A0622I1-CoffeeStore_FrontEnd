import { IBillDto } from "./IBillDto";

export interface BillResponse {
    content: IBillDto[];
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
