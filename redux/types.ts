import { Category, User } from "swagger/services";

export type TCategoryState = {
  categories: Category[],
  category: Category | null,
  loading: boolean,
  saveLoading: boolean,
}

export type TAuthState = {
  user: User | null;
  loading: boolean;
}
