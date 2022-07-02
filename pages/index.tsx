import Head from 'next/head';
import styles from './index.module.scss';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>cigsmoke</title>
        <meta name="description" content="Test description" />
      </Head>
      Main page
    </>
  );
};

export default IndexPage;
