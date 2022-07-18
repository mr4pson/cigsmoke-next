import { Brand, Category, Color, Image, Parameter, Product, Review, Tag, User } from "swagger/services";

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
  imageList: Image[],
  loading: boolean,
}

export interface PayloadCreateImage {
  config: {},
  file: any
}

export interface TTagState {
  tags: Tag[],
  tag: Tag | null,
  loading: boolean,
  saveLoading: boolean,
}

export type TReviewState = {
  reviews: Review[],
  loading: boolean,
  saveLoading: boolean,
}