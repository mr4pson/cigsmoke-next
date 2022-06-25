export enum Page {
  HOME = "HOME",
  ADMIN = 'ADMIN',
  TEST = "TEST"
}

export const paths = {
  [Page.HOME]: "/",
  [Page.ADMIN]: '/admin',
  [Page.TEST]: "/test-page",
};
