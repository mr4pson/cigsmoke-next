import { Breadcrumb, Button, Layout, Menu } from 'antd';
import { Role } from 'common/enums/roles.enum';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { User, UserService } from 'swagger/services';
import { items } from './constants';
import {
  currentPath,
  getSelectedKeys,
  handleGetSecondHref,
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
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // console.log(router);
    // console.log(router.pathname.substring(1).split('/'));
  }, [router]);

  const backRef: string = handleGetSecondHref(router);
  useEffect(() => {
    (async () => {
      try {
        const response: any = await UserService.findUserById({
          userId: user?.id!,
        });
        if (response.user.role !== Role.Admin) {
          router.push('/');
          console.log('UnAuthorized');
        }
      } catch (error) {
        if (error) {
          router.push('/admin/login');
        }
      }
    })();
  });
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
          <div className={styles['logo']}>{collapsed ? 'Wu' : 'Wuluxe'}</div>
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
              <Breadcrumb.Item>
                <Link href="/admin">
                  <a>Администрирование</a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link href={backRef}>
                  <a>{currentPath(router, 1)}</a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a>{currentPath(router, 2)}</a>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className={styles['site-layout__content']}>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Wuluxe ©2022 Created by The Best Studio
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminLayout;
