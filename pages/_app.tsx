import type { AppProps } from 'next/app';
import { wrapper } from '../redux/store'


import 'antd/dist/antd.css';
import 'styles.css';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(App)