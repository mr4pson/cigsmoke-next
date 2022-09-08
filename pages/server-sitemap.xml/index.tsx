import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { Product, ProductService } from 'swagger/services';

export const getSErverSideProps: GetServerSideProps = async (ctx) => {
  const response = (await ProductService.getProducts()) as unknown as {
    rows: Product[];
  };

  const fields: ISitemapField[] = response?.rows?.map((item) => ({
    loc: `https://wuluxe.ru/product/${item?.url}`,
    lastmod: item.updatedAt,
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function sitemap() {}
