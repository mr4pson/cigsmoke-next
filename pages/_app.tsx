import 'antd/dist/antd.css';
import { navigateTo } from 'common/helpers';
import { getUserInfo } from 'common/helpers/jwtToken.helpers';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { AnimatePresence } from 'framer-motion';
import { setUser } from 'redux/slicers/authSlicer';
import { Page } from 'routes/constants';
import 'styles.css';
import { wrapper } from '../redux/store';
import type {} from 'styled-components/cssprop';
import {
  fetchWishlist,
  createWishlist,
  fetchCategories,
} from 'redux/slicers/store/globalSlicer';

import { createCart, fetchCart } from 'redux/slicers/store/cartSlicer';
import { ContextProvider } from 'common/context/AppContext';

export type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.FC<any>;
  };
};

function App({ Component, pageProps }: ComponentWithPageLayout) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = getUserInfo();
    const basketId = localStorage.getItem('basketId');
    const wishlistId = localStorage.getItem('wishlistId')!;
    // let userId = localStorage.getItem('userId') ?? '';

    // if (!user && !userId) {
    //   userId = v4();
    //   localStorage.setItem('userId', userId);
    // } else if (user) {
    //   userId = user.id!;
    // }

    if (!basketId) {
      dispatch(createCart());
    } else {
      dispatch(fetchCart(basketId));
    }

    if (!wishlistId) {
      dispatch(createWishlist());
    } else {
      dispatch(fetchWishlist(wishlistId));
    }
    dispatch(fetchCategories());

    if (!user && router.pathname.includes('/admin')) {
      navigateTo(router, Page.ADMIN_LOGIN)();
    }

    dispatch(setUser(user));
  }, []);

  return (
    <>
      <ContextProvider>
        {Component.PageLayout ? (
          <Component.PageLayout>
            <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} key={router.asPath} />
            </AnimatePresence>
          </Component.PageLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </ContextProvider>
    </>
  );
  // return router.pathname !== paths[Page.LOGIN] &&
  //   router.pathname.includes('/admin') ? (
  //   <AdminLayout user={user}>
  //     <Component {...pageProps} />
  //   </AdminLayout>
  // ) : (
  //   <Component {...pageProps} />
  // );
}

export default wrapper.withRedux(App);
