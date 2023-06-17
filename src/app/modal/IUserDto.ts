/**
 * IUserDto interface is used to collect data from the API
 *
 * @author TuLG
 * @version 1.0
 * @since 2023-06-15
 */

export interface IUserDto {
  id: number;
  account?: string;
  userName?: string;
  address?: string;
  phoneNumber?: string;
  gender?: string;
  birthday?: string;
  salary?: string;
  position?: string;
}
