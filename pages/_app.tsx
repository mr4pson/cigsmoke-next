import 'antd/dist/antd.css';
import AdminLayout from 'components/admin-layout/layout';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Page, paths } from 'routes/constants';
import 'styles.css';
import { wrapper } from '../redux/store';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return router.pathname !== paths[Page.LOGIN] ? (
    <AdminLayout>
      <Component {...pageProps} />
    </AdminLayout>
  ) : (
    <Component {...pageProps} />
  );
}

export default wrapper.withRedux(App);
