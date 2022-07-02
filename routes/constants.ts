export enum Page {
  HOME,
  LOGIN,
  CATEGORIES,
  PRODCUCTS,
  CREATE_CATEGORY,
  EDIT_CATEGORY,
}

export const paths = {
  [Page.HOME]: "/",
  [Page.LOGIN]: "/login",
  [Page.CATEGORIES]: '/categories',
  [Page.PRODCUCTS]: "/products",
  [Page.CREATE_CATEGORY]: '/categories/create-category',
  [Page.EDIT_CATEGORY]: '/categories/edit-category/[id]',
};
