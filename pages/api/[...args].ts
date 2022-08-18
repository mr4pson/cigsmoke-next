import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = createProxyMiddleware({
  // target: "http://localhost:4010/",
  target: 'http://80.78.245.74:3100/',
  pathRewrite: {
    '^/api/': '/', // remove base path
  },
});

export default proxy;
