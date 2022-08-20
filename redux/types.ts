import { AnalyticsBrand, AnalyticsCategory, AnalyticsProduct, AnalyticsUser, DynamicData } from 'common/interfaces/data-analytics.interfaces';
import {
  Advertisement,
  Basket,
  Brand,
  Category,
  CategoryInTree,
  Checkout,
  Color,
  Image,
  PriceRange,
  Product,
  Review,
  Slide,
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
  serverErr?: number;
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

type TProductState = {
  products: Product[];
  chosenProduct: Product | null;
  loading: boolean;
  saveLoading: boolean;
};

interface SlideImage {
  name?: string,
  uid?: number
}

type TImageState = {
  imageList: (Image | SlideImage)[];
  loading: boolean;
};

interface PayloadCreateImage {
  config: {};
  file: any;
  slideNum?: number
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

type TAnalyticsState = {
  analyticsData: DynamicData[] | 
  AnalyticsCategory[] | 
  AnalyticsBrand[] | 
  AnalyticsProduct[] | 
  AnalyticsUser[] |
  User[],
  loading: boolean,
}


type TProductInfoState = {
  product?: Product;
  loading: boolean;
};

type TBannerState = {
  advertisement: Advertisement[],
  slides: Slide[], 
  loading: boolean,
  saveLoading: boolean
}

interface FetchPayload {
  limit: string;
  offset: string;
}

interface RequestResponse {
  data: Category[] | Brand[] | Checkout[] | Color[] | Product[] | Review[] | Tag[] | User[]
  length: number
}

interface Banner {
  advertisement: Advertisement;
  slides: Slide[];
}

type THomePageState = {
  reviews: Review[];
  brands: Brand[];
  banner: Banner | undefined;
  loading: boolean;
};

type TDeliveryInfo = {
  address: string;
  fullName: string;
  phone: string;
  floor: string;
  door: string;
  roomOrOffice: string;
  postCode: string;
  rignBell: string;
};

type TOrderInfo = {
  comment: string;
  leaveNearDoor: boolean;
};

type TStoreCheckoutState = {
  loading: boolean;
  deliveryInfo: TDeliveryInfo | null;
  orderInfo: TOrderInfo | null;
};

export type {
  TCategoryState,
  TAuthState,
  TColorState,
  TBrandState,
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
  TAnalyticsState,
  FetchPayload,
  RequestResponse,
  THomePageState,
  TBannerState,
  Banner,
  TStoreCheckoutState,
  TDeliveryInfo,
  TOrderInfo,
};
