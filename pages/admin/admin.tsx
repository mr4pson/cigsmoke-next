import Head from 'next/head';
import AdminLayout from "./components/layout/layout";
// import styles from './admin.module.scss';


const Admin: React.FC = () => {
  return (
    <>
      <Head>
        <title>cigsmoke</title>
        <meta
          name="description"
          content="Test description"
        />
      </Head>
      <AdminLayout>
        Main admin page
      </AdminLayout>
    </>
  );
};

export default Admin;
