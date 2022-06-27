import { Header } from 'modules';
import Footer from 'modules/footer';
import Head from 'next/head';
import Link from 'next/link';
import { Page, paths } from 'routes/constants';
import styles from './index.module.scss';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>cigsmoke</title>
        <meta
          name="description"
          content="Test description"
        />
        {/* <meta property="og:title" content="Dendy Metaverse" />
        <meta property="og:site_name" content="Dendy Metaverse"/>
        <meta property="og:description" content="Is an innovative DeFi game platform based on the Play-to-Earn concept" />
        <meta property="og:image" content="/assets/preview.jpg" /> */}
      </Head>
      {/* <Header />
      <div className={styles['page-wrapper']}>
        <div className={"container"}>
          <h1>MAIN PAGE</h1>
          <Link href={paths[Page.ADMIN]}>Admin page</Link>
        </div>
      </div>
      <Footer /> */}
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/[dynamic]/[id]" as="/my-folder/my-id">
            <a>Dynamic nested Route</a>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default IndexPage;
