export interface PaymentMethod {
  payment_id: number;
  name: string;
  image: string;
  commission: string;
  processing_time: string;
  min_dep: string;
  type: string;
  country: string;
}
