import { Breadcrumb, Button, Layout, Menu } from 'antd';
import { User } from 'common/interfaces/user.interface';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { items } from './constants';
import {
  currentPath,
  getSelectedKeys,
  handleLogout,
  handleSelect,
} from './helpers';
import styles from './layout.module.scss';

const { Header, Content, Footer, Sider } = Layout;

type Props = {
  user: User | null;
  children: any;
};

const AdminLayout: React.FC<Props> = ({ user, children }) => {
  const dispatch = useAppDispatch();
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
          <Header className={styles['site-layout__header']}>
            {
              <div>
                <span>{user?.email}</span>
                <Button onClick={handleLogout(router, dispatch)} type="link">
                  Выйти
                </Button>
              </div>
            }
          </Header>
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
