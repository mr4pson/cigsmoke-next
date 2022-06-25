import { Header } from 'modules';
import Footer from 'modules/footer';
import Head from 'next/head';
import Link from 'next/link';
import { Page, paths } from 'routes/constants';
import styles from './admin.module.scss';

const Admin = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Test | NEXT REALWORLD</title>
        <meta
          name="description"
          content="Test desc"
        />
      </Head>
      <Header />
      <div className={styles['page-wrapper']}>
        <div className={"container"}>
          <h1>ADMIN PAGE</h1>
          <Link href={paths[Page.HOME]}>Home page</Link></div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
