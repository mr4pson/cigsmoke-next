import { 
  DesktopOutlined, 
  PieChartOutlined, 
  BgColorsOutlined, 
  HeatMapOutlined, 
  AppstoreAddOutlined, 
  FileImageOutlined 
} from '@ant-design/icons';

import { Page, paths } from 'routes/constants';
import { getItem } from './helpers';
import { TMenuItem } from './types';

export const items: TMenuItem[] = [
  getItem('Категории', paths[Page.ADMIN_CATEGORIES], <PieChartOutlined />),
  getItem('Продукты', paths[Page.ADMIN_PRODCUCTS], <DesktopOutlined />),
  getItem('Цвета', paths[Page.ADMIN_COLORS], <BgColorsOutlined />),
  getItem('Бренды', paths[Page.ADMIN_BRANDS], <HeatMapOutlined />),
  getItem('Параметры', paths[Page.ADMIN_PARAMETERS], <AppstoreAddOutlined />),
];
