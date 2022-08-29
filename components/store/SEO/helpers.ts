const settings = {
  graphql: {
    uri: 'http://www.wuluxe.ru',
  },
  meta: {
    rootUrl: 'http://www.wuluxe.ru',
    title: 'Wuluxe',
    description: 'The app description goes here.',
    social: {
      graphic:
        'https://cheatcode-assets.s3.amazonaws.com/default-social-graphic.png',
      twitter: '@cheatcodetuts',
    },
  },
  routes: {
    authenticated: {
      pathAfterFailure: '/',
    },
    public: {
      pathAfterFailure: '/',
    },
  },
};

export { settings };
