import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import { Page, paths } from 'routes/constants';
import { getItem } from './helpers';
import { TMenuItem } from './types';

export const items: TMenuItem[] = [
  getItem('Категории', paths[Page.ADMIN_CATEGORIES], <PieChartOutlined />),
  getItem('Продукты', paths[Page.ADMIN_PRODCUCTS], <DesktopOutlined />),
];
