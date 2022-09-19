//import { GetServerSideProps } from 'next';
//import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
//import { Product, ProductService } from 'swagger/services';

//export const getSErverSideProps: GetServerSideProps = async (ctx) => {
 // const response = (await ProductService.getProducts()) as unknown as {
  //  rows: Product[];
//  };

 // const fields: ISitemapField[] = response?.rows?.map((item) => ({
//    loc: `https://wuluxe.ru/product/${item?.url}`,
//    changefreq: 'daily',
//    lastmod: item.updatedAt,
//    priority: 0.7,
//  }));

//  return getServerSideSitemap(ctx, fields);
//};

//export default function sitemap() {}


import { getServerSideSitemap } from 'next-sitemap';

export const getServerSideProps = async (ctx) => {
  let posts: any = await fetch('http://localhost:4010/products?limit=10000');
  posts = await posts.json();
  const newsSitemaps = posts.rows.map((item) => ({
    loc: `https://wuluxe.ru/product/${item?.url}`,
    changefreq: 'daily',
    lastmod: item.updatedAt,
    priority: 0.7,
  }));

  const fields = [...newsSitemaps];

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
