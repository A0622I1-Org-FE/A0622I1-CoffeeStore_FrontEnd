/**
 * IFeedbackDto interface is used to collect data from the API
 *
 * @author TuLG
 * @version 1.0
 * @since 2023-06-13
 */


export interface IFeedbackDto {
  id: number;
  fb_id?: string;
  name?: string;
  email?: string;
  date?: string;
  content?: string;
  type?: string;
}
