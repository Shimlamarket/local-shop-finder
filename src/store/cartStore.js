
import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find(
        (i) => i.productId === item.productId && i.shopId === item.shopId
      );
      
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.productId === item.productId && i.shopId === item.shopId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      
      return { items: [...state.items, item] };
    }),
  
  updateQuantity: (productId, shopId, quantity) =>
    set((state) => ({
      items: quantity === 0
        ? state.items.filter(
            (item) => !(item.productId === productId && item.shopId === shopId)
          )
        : state.items.map((item) =>
            item.productId === productId && item.shopId === shopId
              ? { ...item, quantity }
              : item
          ),
    })),
  
  removeItem: (productId, shopId) =>
    set((state) => ({
      items: state.items.filter(
        (item) => !(item.productId === productId && item.shopId === shopId)
      ),
    })),
  
  clearCart: () => set({ items: [] }),
  
  getTotalAmount: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  
  getOrderHistory: () => {
    try {
      const history = localStorage.getItem('orderHistory');
      return history ? JSON.parse(history) : [];
    } catch {
      return [];
    }
  },
}));
