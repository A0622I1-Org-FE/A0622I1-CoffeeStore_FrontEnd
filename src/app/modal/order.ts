export interface Order {
  id?: number;
  service_id: number;
  name: string;
  quantity: number;
  price: number;
  sum: number;
}
