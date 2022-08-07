import { AnalyticsBrand, AnalyticsCategory, AnalyticsProduct, AnalyticsUser, DynamicData, DynamicUsersData } from "common/interfaces/data-analytics.interfaces";
import { Basket, Brand, Category, Checkout, Color, Image, Parameter, PriceRange, Product, Review, Tag, User, Wishlist } from "swagger/services";

type TCategoryState = {
  categories: Category[],
  category: Category | null,
  loading: boolean,
  saveLoading: boolean,
}

type TAuthState = {
  user: User | null;
  loading: boolean;
}

type TColorState = {
  colors: Color[],
  chosenColor: Color | null,
  loading: boolean,
  saveLoading: boolean,
}

type TBrandState = {
  brands: Brand[],
  chosenBrand: Brand | null,
  loading: boolean,
  saveLoading: boolean,
}

type TParameterState = {
  parameters: Parameter[],
  chosenParameter: Parameter | null,
  loading: boolean,
  saveLoading: boolean,
}

type TProductState = {
  products: Product[],
  chosenProduct: Product | null,
  loading: boolean,
  saveLoading: boolean,
}

type TImageState = {
  imageList: Image[],
  loading: boolean,
}

interface PayloadCreateImage {
  config: {},
  file: any
}

interface TTagState {
  tags: Tag[],
  tag: Tag | null,
  loading: boolean,
  saveLoading: boolean,
}

type TReviewState = {
  reviews: Review[],
  loading: boolean,
  saveLoading: boolean,
}

type TGlobalState = {
  wishlist: Wishlist | null;
  categories: Category[];
  products: Product[];
  loading: boolean;
}

type TCartState = {
  cart: Basket | null;
  loading: boolean;
}

type TFilters = {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  desc?: string;
  available?: boolean;
  colors?: string[];
  categories?: string[];
  brands?: string[];
  tags?: string[];
};

type TCatalogState = {
  categories: Category[];
  brands: Brand[];
  colors: Color[];
  priceRange: PriceRange;
  products: Product[];
  loading: boolean;
  filters: TFilters;
}

type TCheckoutState = {
  checkouts: Checkout[],
  loading: boolean,
  saveLoading: boolean,
}

type TAnalyticsState = {
  analyticsData: DynamicData[] | 
  AnalyticsCategory[] | 
  AnalyticsBrand[] | 
  AnalyticsProduct[] | 
  AnalyticsUser[],
  usersData: DynamicUsersData | {},
  loading: boolean,
}

export type { TCategoryState, TAuthState, TColorState, TBrandState, TParameterState, TProductState, TImageState, PayloadCreateImage, TTagState, TReviewState, TGlobalState, TCartState, TFilters, TCatalogState, TCheckoutState, TAnalyticsState };