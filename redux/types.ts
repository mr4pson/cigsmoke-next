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
  ProductVariant,
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

type TMultipleImageState = {
  imagesMap: Object;
  loading: boolean;
};

interface PayloadCreateImage {
  config: {};
  file: any;
  slideNum?: number;
  index?: number;
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
  variant: ProductVariant | null;
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
  productsLength: number;
  loading: boolean;
  filters: TFilters;
  page: number;
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
  products: Product[];
  productsLength: number;
  loading: boolean;
  saveLoading: boolean;
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
  available?: boolean
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
  checkouts: Checkout[];
  loading: boolean;
  deliveryInfo: TDeliveryInfo | null;
  orderInfo: TOrderInfo | null;
};

type TWishlistState = {
  products: Product[];
  loading: boolean;
};

type TProductReviewsState = {
  reviews: Review[];
  loading: boolean;
};

type TProfileState = {
  reviews: Review[];
  loading: boolean;
  saveLoading: boolean;
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
  TMultipleImageState,
  TWishlistState,
  TProductReviewsState,
  TProfileState,
};
