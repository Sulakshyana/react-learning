import { createContext } from "react";

type User = {
  name: string;
  id: number;
};

type UserContextType = {
  user: User;
  cart: any[];
  addToCart: (item: any) => void;
};

export const userContext = createContext<UserContextType | null>(null);
