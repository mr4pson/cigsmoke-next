import {
  AppstoreAddOutlined,
  BgColorsOutlined,
  DesktopOutlined,
  HeatMapOutlined,
  PieChartOutlined,
  TagsOutlined,
  SkinOutlined,
  CommentOutlined,
  ReconciliationOutlined,
  LineChartOutlined,
  MinusOutlined,
  QuestionCircleOutlined,
  FundProjectionScreenOutlined,
} from '@ant-design/icons';
import { Page, paths } from 'routes/constants';

import { getItem } from './helpers';
import { PathWords, TMenuItem } from './types';

export const items: TMenuItem[] = [
  getItem('Категории', paths[Page.ADMIN_CATEGORIES], <PieChartOutlined />),
  getItem('Продукты', paths[Page.ADMIN_PRODUCTS], <DesktopOutlined />),
  getItem('Цвета', paths[Page.ADMIN_COLORS], <BgColorsOutlined />),
  getItem('Бренды', paths[Page.ADMIN_BRANDS], <HeatMapOutlined />),
  getItem('Теги', paths[Page.ADMIN_TAGS], <TagsOutlined />),
  getItem('Размер', paths[Page.ADMIN_SIZES], <SkinOutlined />),
  getItem('Отзывы', paths[Page.ADMIN_REVIEWS], <CommentOutlined />),
  getItem('Вопросы', paths[Page.ADMIN_QUESTIONS], <QuestionCircleOutlined />),
  getItem('Заказы', paths[Page.ADMIN_CHECKOUTS], <ReconciliationOutlined />),
  getItem(
    'Баннеры',
    paths[Page.ADMIN_BANNERS],
    <FundProjectionScreenOutlined />,
  ),
  getItem('Аналитика', '', <LineChartOutlined />, [
    getItem(
      'Категории',
      paths[Page.ADMIN_ANALYTICS_CATEGORIES],
      <MinusOutlined />,
    ),
    getItem('Бренды', paths[Page.ADMIN_ANALYTICS_BRANDS], <MinusOutlined />),
    getItem(
      'Продукты',
      paths[Page.ADMIN_ANALYTICS_PRODUCTS],
      <MinusOutlined />,
    ),
    getItem(
      'Пользователи',
      paths[Page.ADMIN_ANALYTICS_USERS],
      <MinusOutlined />,
    ),
    getItem('Динамика', paths[Page.ADMIN_ANALYTICS_DYNAMIC], <MinusOutlined />),
  ]),
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
  products: 'Продукты',
  'products/create-product': 'Создание продукта',
  'products/[id]': 'Редактирование продукта',
  tags: 'Теги',
  'tags/create-tag': 'Создание тега',
  'tags/[id]': 'Редактирование тега',
  sizes: 'Размер',
  'sizes/create-size': 'Создание размер',
  'sizes/[id]': 'Редактирование размер',
  reviews: 'Отзывы',
  questions: 'Вопросы',
  checkouts: 'Заказы',
  analytics: 'Аналитика',
  'analytics/categories': 'Категории',
  'analytics/brands': 'Бренды',
  'analytics/products': 'Продукты',
  'analytics/users': 'Пользователи',
  'analytics/dynamic': 'Динамика',
  banners: 'Баннеры',
  'banners/update-banner': 'Обновление баннеров',
};
