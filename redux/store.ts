import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  ThunkAction
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import authReducer from './slicers/authSlicer';
import categoriesReducer from './slicers/categoriesSlicer';
import colorsReducer from './slicers/colorsSlicer'
import brandsReducer from "./slicers/brandsSlicer"
import parametersReducer from "./slicers/parametersSlicer"
import productsReducer from './slicers/productsSlicer';
import imagesReducer from './slicers/imagesSlicer';
import tagsReducer from "./slicers/tagsSlicer"
import reviewsReducer from "./slicers/reviewsSlicer"
import checkoutsReducer from "./slicers/checkoutsSlicer"

const combinedReducer = combineReducers({
  categories: categoriesReducer,
  auth: authReducer,
  colors: colorsReducer,
  brands: brandsReducer,
  parameters: parametersReducer,
  products: productsReducer,
  images: imagesReducer,
  tags: tagsReducer,
  reviews: reviewsReducer,
  checkouts: checkoutsReducer
});

const reducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    }),
  } as any);

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper(makeStore, { debug: true });
