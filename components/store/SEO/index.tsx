import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { settings } from './helpers';

const socialTags = ({
  openGraphType,
  url,
  title,
  description,
  image,
  createdAt,
  updatedAt,
}) => {
  const metaTags = [
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:site',
      content:
        settings &&
        settings.meta &&
        settings.meta.social &&
        settings.meta.social.twitter,
    },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    {
      name: 'twitter:creator',
      content:
        settings &&
        settings.meta &&
        settings.meta.social &&
        settings.meta.social.twitter,
    },
    { name: 'twitter:image:src', content: image },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'og:title', content: title },
    { name: 'og:type', content: openGraphType },
    { name: 'og:url', content: url },
    { name: 'og:image', content: image },
    { name: 'og:description', content: description },
    {
      name: 'og:site_name',
      content: settings && settings.meta && settings.meta.title,
    },
    {
      name: 'og:published_time',
      content: createdAt || new Date().toISOString(),
    },
    {
      name: 'og:modified_time',
      content: updatedAt || new Date().toISOString(),
    },
  ];

  return metaTags;
};

const SEO = (props: any) => {
  const { url, title, description, image, schemaType, keywords } = props;
  const images: any = [];
  for (let i = 0; i < image.length; i++) {
    images.push(`http://194.58.90.236:4010/api/images/${image[i]}`);
  }
  return (
    <Head>
      <title>{title} | Wuluxe</title>
      <meta name="robots" content="index, follow" />
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta
        name="image"
        content={`http://194.58.90.236:4010/api/images/${image[0]}`}
      />
      <meta name="keywords" content={keywords} />
      {socialTags(props).map(({ name, content }) => {
        return <meta key={name} name={name} content={content} />;
      })}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'Product',
            name: title,
            description: description,
            // url: url,
            image: images,
            brand: {
              '@type': 'Brand',
              name: 'ACME',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.4',
              reviewCount: '89',
            },
            offers: {
              '@type': 'Offer',
              url: url,
              priceCurrency: 'RUB',
              price: '119.99',
              // priceValidUntil: '2020-11-20',
              itemCondition: 'https://schema.org/NewCondition',
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />
    </Head>
  );
};
// options for avialability
// BackOrder;
// Discontinued;
// InStock;
// InStoreOnly;
// LimitedAvailability;
// OnlineOnly;
// OutOfStock;
// PreOrder;
// PreSale;
// SoldOut;

// SEO.defaultProps = {
//   title: settings && settings.meta && settings.meta.title,
//   description: settings && settings.meta && settings.meta.description,
//   image:
//     settings &&
//     settings.meta &&
//     settings.meta.social &&
//     settings.meta.social.graphic,
// };

// SEO.propTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
//   image: PropTypes.string,
// };

export default SEO;
