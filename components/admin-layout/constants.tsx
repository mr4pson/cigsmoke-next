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
  getItem('Категории', paths[Page.CATEGORIES], <PieChartOutlined />),
  getItem('Продукты', paths[Page.PRODCUCTS], <DesktopOutlined />),
  getItem('Цвета', paths[Page.COLORS], <BgColorsOutlined />),
  getItem('Бренды', paths[Page.BRANDS], <HeatMapOutlined />),
  getItem('Параметры', paths[Page.PARAMETERS], <AppstoreAddOutlined />),
  getItem('Изображения', paths[Page.IMAGES], <FileImageOutlined />),
];
