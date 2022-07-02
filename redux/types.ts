import { Category } from "common/interfaces/category.interface";
import { User } from "common/interfaces/user.interface";

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
