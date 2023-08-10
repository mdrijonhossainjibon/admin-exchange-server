import { UserOrderTable } from "./UserOrderTable";

const dataTable = [
  {
    id: 1,
    market: { name: "LTC/UTSD" },
    origin_volume: 100,
    executed_volume: 50,
    price: 10,
    side: "Buy",
    created_at: "2023-06-18T10:00:00Z",
    updated_at: "2023-06-18T12:00:00Z",
    state: "Wait",
  },
  {
    id: 2,
    market: { name: "BTC/USDT" },
    origin_volume: 200,
    executed_volume: 150,
    price: 15,
    side: "Sell",
    created_at: "2023-06-19T09:00:00Z",
    updated_at: "2023-06-19T11:00:00Z",
    state: "Completed",
  },
  {
    id: 3,
    market: { name: "BTC/USDT" },
    origin_volume: 200,
    executed_volume: 150,
    price: 15,
    side: "Sell",
    created_at: "2023-06-19T09:00:00Z",
    updated_at: "2023-06-19T11:00:00Z",
    state: "Cancel",
  }
];


export const UserDetailsOpenOrders = ({ user }) =>{

  return <UserOrderTable orders={dataTable}  />;
}
