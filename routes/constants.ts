export enum Page {
  HOME,
  LOGIN,
  ADMIN_CATEGORIES,
  ADMIN_PRODCUCTS,
  ADMIN_CREATE_CATEGORY,
  ADMIN_EDIT_CATEGORY,
}

export const paths = {
  [Page.HOME]: "/",
  [Page.LOGIN]: "/admin/login",
  [Page.ADMIN_CATEGORIES]: '/admin/categories',
  [Page.ADMIN_PRODCUCTS]: "/admin/products",
  [Page.ADMIN_CREATE_CATEGORY]: '/admin/categories/create-category',
  [Page.ADMIN_EDIT_CATEGORY]: '/admin/categories/[id]',
};
