import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = createProxyMiddleware({
  // target: 'http://localhost:4010/',
  target: 'http://194.58.90.236:4010',
  pathRewrite: {
    '^/api/': '/', // remove base path
  },
});

export default proxy;
