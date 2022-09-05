const settings = {
  graphql: {
    uri: 'http://www.wuluxe.ru',
  },
  meta: {
    rootUrl: 'http://www.wuluxe.ru',
    title: 'Wuluxe',
    description: 'Wuluxe, где вы найдете удовольствие',
    social: {
      graphic:
        'https://cheatcode-assets.s3.amazonaws.com/default-social-graphic.png',
      twitter: '@wuluxe',
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
