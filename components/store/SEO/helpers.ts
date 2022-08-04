const settings = {
  graphql: {
    uri: 'http://localhost:3000',
  },
  meta: {
    rootUrl: 'http://localhost:3000',
    title: 'Cigsmoke',
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
