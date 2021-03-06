import { Product } from 'swagger/services';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Test product 1',
    price: 1000,
    oldPrice: 1100,
    desc: 'Test desc',
    available: true,
    createdAt: '2022-07-10 21:37:56.566038',
    updatedAt: '2022-07-10 21:37:56.566038',
    colors: [],
    category: {
      id: '1',
      name: 'Category 1',
      createdAt: '2022-07-10 21:37:56.566038',
      updatedAt: '2022-07-10 21:37:56.566038',
      parameters: [],
      url: 'category-1',
    },
    images:
      '["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"]',
    brand: {
      id: '1',
      name: 'Test product',
      image: '',
    },
    url: 'test-product-1',
  },
  {
    id: '2',
    name: 'Test product 2',
    price: 1000,
    oldPrice: 1100,
    desc: 'Test desc 2',
    available: true,
    createdAt: '2022-07-10 21:37:56.566038',
    updatedAt: '2022-07-10 21:37:56.566038',
    colors: [],
    category: {
      id: '1',
      name: 'Category 1',
      createdAt: '2022-07-10 21:37:56.566038',
      updatedAt: '2022-07-10 21:37:56.566038',
      parameters: [],
      url: 'category-2',
    },
    images:
      '["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"]',
    brand: {
      id: '1',
      name: 'Test product',
      image: '',
    },
    url: 'test-product-1',
  },
  {
    id: '3',
    name: 'Test product 3',
    price: 1000,
    oldPrice: 1100,
    desc: 'Test desc 3',
    available: true,
    createdAt: '2022-07-10 21:37:56.566038',
    updatedAt: '2022-07-10 21:37:56.566038',
    colors: [],
    category: {
      id: '1',
      name: 'Category 1',
      createdAt: '2022-07-10 21:37:56.566038',
      updatedAt: '2022-07-10 21:37:56.566038',
      parameters: [],
      url: 'category-2',
    },
    images:
      '["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"]',
    brand: {
      id: '1',
      name: 'Test product',
      image: '',
    },
    url: 'test-product-3',
  },
  {
    id: '4',
    name: 'Test product 4',
    price: 1000,
    oldPrice: 1100,
    desc: 'Test desc 4',
    available: true,
    createdAt: '2022-07-10 21:37:56.566038',
    updatedAt: '2022-07-10 21:37:56.566038',
    colors: [],
    category: {
      id: '1',
      name: 'Category 1',
      createdAt: '2022-07-10 21:37:56.566038',
      updatedAt: '2022-07-10 21:37:56.566038',
      parameters: [],
      url: 'category-1',
    },
    images:
      '["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"]',
    brand: {
      id: '1',
      name: 'Test product',
      image: '',
    },
    url: 'test-product-4',
  },
  {
    id: '5',
    name: 'Test product 5',
    price: 1000,
    oldPrice: 1100,
    desc: 'Test desc 5',
    available: true,
    createdAt: '2022-07-10 21:37:56.566038',
    updatedAt: '2022-07-10 21:37:56.566038',
    colors: [],
    category: {
      id: '1',
      name: 'Category 1',
      createdAt: '2022-07-10 21:37:56.566038',
      updatedAt: '2022-07-10 21:37:56.566038',
      parameters: [],
      url: 'category-2',
    },
    images:
      '["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"]',
    brand: {
      id: '1',
      name: 'Test product',
      image: '',
    },
    url: 'test-product-5',
  },
  {
    id: '6',
    name: 'Test product 6',
    price: 1000,
    oldPrice: 1100,
    desc: 'Test desc 6',
    available: true,
    createdAt: '2022-07-10 21:37:56.566038',
    updatedAt: '2022-07-10 21:37:56.566038',
    colors: [],
    category: {
      id: '1',
      name: 'Category 1',
      createdAt: '2022-07-10 21:37:56.566038',
      updatedAt: '2022-07-10 21:37:56.566038',
      parameters: [],
      url: 'category-2',
    },
    images:
      '["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"]',
    brand: {
      id: '1',
      name: 'Test product',
      image: '',
    },
    url: 'test-product-6',
  },
  {
    id: '7',
    name: 'Test product 7',
    price: 1000,
    oldPrice: 1100,
    desc: 'Test desc 7',
    available: true,
    createdAt: '2022-07-10 21:37:56.566038',
    updatedAt: '2022-07-10 21:37:56.566038',
    colors: [],
    category: {
      id: '1',
      name: 'Category 1',
      createdAt: '2022-07-10 21:37:56.566038',
      updatedAt: '2022-07-10 21:37:56.566038',
      parameters: [],
      url: 'category-2',
    },
    images:
      '["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"]',
    brand: {
      id: '1',
      name: 'Test product',
      image: '',
    },
    url: 'test-product-7',
  },
  {
    id: '8',
    name: 'Test product 8',
    price: 1000,
    oldPrice: 1100,
    desc: 'Test desc 8',
    available: true,
    createdAt: '2022-07-10 21:37:56.566038',
    updatedAt: '2022-07-10 21:37:56.566038',
    colors: [],
    category: {
      id: '1',
      name: 'Category 1',
      createdAt: '2022-07-10 21:37:56.566038',
      updatedAt: '2022-07-10 21:37:56.566038',
      parameters: [],
      url: 'category-2',
    },
    images:
      '["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"]',
    brand: {
      id: '1',
      name: 'Test product',
      image: '',
    },
    url: 'test-product-7',
  },
];

export { PRODUCTS };
