import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

export const getSErverSideProps: GetServerSideProps = async (ctx) => {
  // TODO fetch api categories and products and add thier id here
  const response = await fetch('https://fakestoreapi.com/products');

  const data: any[] = await response.json();

  const fields: ISitemapField[] = data.map((item) => ({
    loc: `https://www.wuluxe.ru/product/${item.id}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function sitemap() {}
