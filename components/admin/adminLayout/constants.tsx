import {
  AppstoreAddOutlined,
  BgColorsOutlined,
  DesktopOutlined,
  HeatMapOutlined,
  PieChartOutlined,
  TagsOutlined,
  CommentOutlined,
  ReconciliationOutlined,
} from '@ant-design/icons';
import { Page, paths } from 'routes/constants';

import { getItem } from './helpers';
import { PathWords, TMenuItem } from './types';

export const items: TMenuItem[] = [
  getItem('Категории', paths[Page.ADMIN_CATEGORIES], <PieChartOutlined />),
  getItem('Продукты', paths[Page.ADMIN_PRODUCTS], <DesktopOutlined />),
  getItem('Цвета', paths[Page.ADMIN_COLORS], <BgColorsOutlined />),
  getItem('Бренды', paths[Page.ADMIN_BRANDS], <HeatMapOutlined />),
  getItem('Параметры', paths[Page.ADMIN_PARAMETERS], <AppstoreAddOutlined />),
  getItem('Теги', paths[Page.ADMIN_TAGS], <TagsOutlined />),
  getItem('Комментарии', paths[Page.ADMIN_REVIEWS], <CommentOutlined />),
  getItem('Заказы', paths[Page.ADMIN_CHECKOUTS], <ReconciliationOutlined />),
];

export const pathWords: PathWords = {
  categories: 'Категории',
  'categories/[id]': 'Редактирование категории',
  'categories/create-category': 'Создание новой категории',
  colors: 'Цвета',
  'colors/create-color': 'Создание цвета',
  'colors/[id]': 'Редактирование цвета',
  brands: 'Бренды',
  'brands/create-brand': 'Создание бренда',
  'brands/[id]': 'Редактирование бренда',
  parameters: 'Параметры',
  'parameters/create-parameter': 'Создание параметра',
  'parameters/[id]': 'Редактирование параметра',
  products: 'Продукты',
  'products/create-product': 'Создание продукта',
  'products/[id]': 'Редактирование продукта',
  tags: 'Теги',
  'tags/create-tag': 'Создание тега',
  'tags/[id]': 'Редактирование тега',
  reviews: 'Комментарии',
  checkouts: 'Заказы',
};
