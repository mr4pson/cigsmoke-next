import {
  Basket,
  Brand,
  Category,
  CategoryInTree,
  Checkout,
  Color,
  Image,
  Parameter,
  PriceRange,
  Product,
  Review,
  Tag,
  User,
  Wishlist,
} from 'swagger/services';

type TCategoryState = {
  categories: Category[];
  category: Category | null;
  loading: boolean;
  saveLoading: boolean;
};

type TAuthState = {
  user: User | null;
  loading: boolean;
};

type TColorState = {
  colors: Color[];
  chosenColor: Color | null;
  loading: boolean;
  saveLoading: boolean;
};

type TBrandState = {
  brands: Brand[];
  chosenBrand: Brand | null;
  loading: boolean;
  saveLoading: boolean;
};

type TParameterState = {
  parameters: Parameter[];
  chosenParameter: Parameter | null;
  loading: boolean;
  saveLoading: boolean;
};

type TProductState = {
  products: Product[];
  chosenProduct: Product | null;
  loading: boolean;
  saveLoading: boolean;
};

type TImageState = {
  imageList: Image[];
  loading: boolean;
};

interface PayloadCreateImage {
  config: {};
  file: any;
}

interface TTagState {
  tags: Tag[];
  tag: Tag | null;
  loading: boolean;
  saveLoading: boolean;
}

type TReviewState = {
  reviews: Review[];
  loading: boolean;
  saveLoading: boolean;
};

type TGlobalState = {
  searchQuery: string;
  wishlist: Wishlist | null;
  categories: CategoryInTree[];
  brands: Brand[];
  products: Product[];
  loading: boolean;
  productsLoading: boolean;
};

type TCartState = {
  cart: Basket | null;
  loading: boolean;
};

type TFilters = {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  desc?: string;
  available?: boolean;
  colors?: string[];
  categories?: string[];
  subCategories?: string[];
  parent?: string | undefined;
  brands?: string[];
  tags?: string[];
};

type TCatalogState = {
  categories: Category[];
  subCategories: Category[];
  brands: Brand[];
  colors: Color[];
  priceRange: PriceRange;
  products: Product[];
  loading: boolean;
  filters: TFilters;
};

type TCheckoutState = {
  checkouts: Checkout[];
  loading: boolean;
  saveLoading: boolean;
};

type TProductInfoState = {
  product?: Product;
  loading: boolean;
};

export type {
  TCategoryState,
  TAuthState,
  TColorState,
  TBrandState,
  TParameterState,
  TProductState,
  TImageState,
  PayloadCreateImage,
  TTagState,
  TReviewState,
  TGlobalState,
  TCartState,
  TFilters,
  TCatalogState,
  TCheckoutState,
  TProductInfoState,
};
