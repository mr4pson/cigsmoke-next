import { Brand, Category, Color, Image, Parameter, Product, User } from "swagger/services";

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

export type TColorState = {
  colors: Color[],
  chosenColor: Color | null,
  loading: boolean,
  saveLoading: boolean,
}

export type TBrandState = {
  brands: Brand[],
  chosenBrand: Brand | null,
  loading: boolean,
  saveLoading: boolean,
}

export type TParameterState = {
  parameters: Parameter[],
  chosenParameter: Parameter | null,
  loading: boolean,
  saveLoading: boolean,
}

export type TProductState = {
  products: Product[],
  chosenProduct: Product | null,
  loading: boolean,
  saveLoading: boolean,
}

export type TImageState = {
  image: Image | null,
  loading: boolean,
  saveLoading: boolean,
}