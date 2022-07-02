import { Breadcrumb, Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { items } from './constants';
import { currentPath, getSelectedKeys, handleSelect } from './helpers';
import styles from './layout.module.scss';

const { Header, Content, Footer, Sider } = Layout;

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => {
            setCollapsed(!collapsed);
          }}
        >
          <div className={styles['logo']}>Cigsmoke</div>
          <Menu
            onSelect={handleSelect(router)}
            theme="dark"
            defaultSelectedKeys={getSelectedKeys(router.pathname)}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className={styles['site-layout__header']}
            style={{ padding: 0 }}
          />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Администрирование</Breadcrumb.Item>
              <Breadcrumb.Item>{currentPath(router)}</Breadcrumb.Item>
            </Breadcrumb>
            <div className={styles['site-layout__content']}>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminLayout;
