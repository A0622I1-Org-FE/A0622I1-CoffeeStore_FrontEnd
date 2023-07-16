/**
 * IFeedbackDto interface is used to collect data from the API
 *
 * @author TuLG
 * @version 1.0
 * @since 2023-06-13
 */


export interface IServiceDto1 {
  id: number;
  imgUrl?: string;
  serviceName?: string;
  price?: number;
  serviceType?: string;
  createdDate?: string;
  salePrice?: number;
  quantity?: number;
  payment?: number;
  statusFlag?: string;
}
