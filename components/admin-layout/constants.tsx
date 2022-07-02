import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import { Page, paths } from 'routes/constants';
import { getItem } from './helpers';
import { TMenuItem } from './type';

export const items: TMenuItem[] = [
  getItem('Категории', paths[Page.CATEGORIES], <PieChartOutlined />),
  getItem('Продукты', paths[Page.PRODCUCTS], <DesktopOutlined />),
];
