import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
          const existingItem = state.orders.find((order) => order._id === item._id);
          if (existingItem) {
            return {
              orders: state.orders.map((order) =>
                order._id === item._id
                  ? { ...order, amount: order.amount + item.amount }
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