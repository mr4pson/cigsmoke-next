import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from './layout.module.scss';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Categories','/admin/categories', <PieChartOutlined />),
  getItem('Products', '/admin/products', <DesktopOutlined />),
];

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const handleSelect = (route: any) => {
    router.push(route.key);
  }

  return (
    <>
      <Head>
        <title>cigsmoke</title>
        <meta
          name="description"
          content="Test description"
        />
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
          <div className={styles["logo"]}>Cigsmoke</div>
          <Menu onSelect={handleSelect} theme="dark" defaultSelectedKeys={[router.pathname]} mode="inline" items={items} />
        </Sider>
        <Layout className="site-layout">
          <Header className={styles["site-layout__header"]} style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className={styles["site-layout__content"]}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </>
  )
}

export default AdminLayout;