export interface DashboardSummaryResponse {
  orders: number;
  ordersPayed: number;
  withouPayOrders: number;
  clients: number;
  products: number;
  productsWithoutStock: number;
  productsWithBreak: number;
}
