import { create } from 'zustand';
import { persist } from 'zustand/middleware';

//Item information
type info = {
    _id:string,
    name: string,
    brand: string,
    amount: number,
    price: number,
    size: string,
    color: string,
    image: string
}  

//state & actions 
type State = {
    orders: info[]
}

type Actions = {
    addToCart: (item:info)=>void,
    deleteItem: (_id:string)=>void,
    clearCart: ()=>void
}
 
const useOrderStore = create<State & Actions>()(
    persist((set)=>({
    orders: [],
    addToCart: (item) => {
        set((state) => {
          const existingItem = state.orders.find((order) => order.brand === item.brand);
          if (existingItem) {
            return {
              orders: state.orders.map((order) =>
                order.brand === item.brand
                  ? { ...order,price: order.price + item.price, amount: order.amount + item.amount, size: order.size === item.size? order.size : order.size + ","+ item.size, color: order.color === item.color? order.color: order.color + "," + item.color}
                  : order
              ),
            };
          }
          return { orders: [...state.orders, item] };
        });
      },
    deleteItem: (_id)=>set((state)=>({...state, orders:state.orders.filter(Order=> Order._id !== _id)})),
    clearCart: ()=>set({orders:[]})
}),
   {name : "cart-storage"}
),
)

export {useOrderStore}