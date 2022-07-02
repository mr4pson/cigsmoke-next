export enum Page {
  HOME,
  CATEGORIES,
  PRODCUCTS,
  CREATE_CATEGORY,
  EDIT_CATEGORY,
}

export const paths = {
  [Page.HOME]: "/",
  [Page.CATEGORIES]: '/categories',
  [Page.PRODCUCTS]: "/products",
  [Page.CREATE_CATEGORY]: '/categories/create-category',
  [Page.EDIT_CATEGORY]: '/categories/[id]',
};
