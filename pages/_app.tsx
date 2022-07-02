import 'antd/dist/antd.css';
import { navigateTo } from 'common/helpers';
import { getUserInfo } from 'common/helpers/jwtToken.helpers';
import AdminLayout from 'components/admin-layout/layout';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setUser } from 'redux/slicers/authSlicer';
import { Page, paths } from 'routes/constants';
import 'styles.css';
import { wrapper } from '../redux/store';

function App({ Component, pageProps }: AppProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const user = getUserInfo();

    if (!user) {
      navigateTo(router, Page.LOGIN)();
    }

    dispatch(setUser(user));
  }, []);

  return router.pathname !== paths[Page.LOGIN] ? (
    <AdminLayout user={user}>
      <Component {...pageProps} />
    </AdminLayout>
  ) : (
    <Component {...pageProps} />
  );
}

export default wrapper.withRedux(App);
