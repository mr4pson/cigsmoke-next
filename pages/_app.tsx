import 'antd/dist/antd.css';
import AdminLayout from 'components/admin-layout/layout';
import { AppProps } from 'next/app';
import 'styles.css';
import { wrapper } from '../redux/store';

function App({ Component, pageProps }: AppProps) {
  return (
    <AdminLayout>
      <Component {...pageProps} />
    </AdminLayout>
  );
}

export default wrapper.withRedux(App);
