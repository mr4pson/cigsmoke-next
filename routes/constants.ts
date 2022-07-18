export enum Page {
  HOME,
  ADMIN_LOGIN,
  ADMIN_COLORS,
  ADMIN_CREATE_COLORS,
  ADMIN_EDIT_COLORS,
  ADMIN_BRANDS,
  ADMIN_CREATE_BRAND,
  ADMIN_EDIT_BRAND,
  ADMIN_PARAMETERS,
  ADMIN_CREATE_PARAMETER,
  ADMIN_EDIT_PARAMETER,
  ADMIN_CREATE_PRODUCT,
  ADMIN_EDIT_PRODUCT,
  ADMIN_CATEGORIES,
  ADMIN_PRODUCTS,
  ADMIN_CREATE_CATEGORY,
  ADMIN_EDIT_CATEGORY,
}

export const paths = {
  [Page.HOME]: "/",
  [Page.ADMIN_LOGIN]: "/admin/login",
  [Page.ADMIN_CATEGORIES]: '/admin/categories',
  [Page.ADMIN_CREATE_CATEGORY]: '/admin/categories/create-category',
  [Page.ADMIN_EDIT_CATEGORY]: '/admin/categories/[id]',
  [Page.ADMIN_COLORS]: '/admin/colors',
  [Page.ADMIN_CREATE_COLORS]: '/admin/colors/create-color',
  [Page.ADMIN_EDIT_COLORS]: '/admin/colors/[id]',
  [Page.ADMIN_BRANDS]: '/admin/brands',
  [Page.ADMIN_CREATE_BRAND]: '/admin/brands/create-brand',
  [Page.ADMIN_EDIT_BRAND]: '/admin/brands/[id]',
  [Page.ADMIN_PARAMETERS]: '/admin/parameters',
  [Page.ADMIN_CREATE_PARAMETER]: '/admin/parameters/create-parameter',
  [Page.ADMIN_EDIT_PARAMETER]: '/admin/parameters/[id]',
  [Page.ADMIN_PRODUCTS]: '/admin/products',
  [Page.ADMIN_CREATE_PRODUCT]: '/admin/products/create-product',
  [Page.ADMIN_EDIT_PRODUCT]: '/admin/products/[id]',
};
