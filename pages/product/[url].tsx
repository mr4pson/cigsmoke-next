import { useRouter } from 'next/router';
import SEO from 'components/store/SEO';
import StoreLayout from 'components/store/storeLayout/layouts';
import ProductInfo from 'components/store/product/productInfo';
import Recomendation from 'components/store/product/recomendation';
import ReveiwsAndQuastions from 'components/store/product/reviewsAndQuastions';
import { useEffect, useRef } from 'react';
import { fetchProduct } from 'redux/slicers/store/productInfoSlicer';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { TProductInfoState } from 'redux/types';
import { Basket, Wishlist } from 'swagger/services';
import Loading from 'ui-kit/Loading';
import styled from 'styled-components';
import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import React, { Suspense } from 'react';

const ProductInfoPage = () => {
  const dispatch = useAppDispatch();
  const { product, loading }: TProductInfoState = useAppSelector(
    (state) => state.productInfo,
  );
  const cart: Basket = useAppSelector((state) => state.cart.cart);
  const wishlist: Wishlist = useAppSelector((state) => state.global.wishlist);

  const router = useRouter();
  const reviewBtnRef = useRef(null);
  const questionBtnRef = useRef(null);

  useEffect(() => {
    if (router.query.url) {
      dispatch(fetchProduct(router.query.url as string));
    }

    return () => {};
  }, [dispatch, router.query]);

  const images = getProductVariantsImages(product?.productVariants);
  // const Recomendation = React.lazy(
  //   () => import('components/store/product/recomendation'),
  // );
  // const ReveiwsAndQuastions = React.lazy(
  //   () => import('components/store/product/reviewsAndQuastions'),
  // );
  return !loading && product ? (
    <>
      <SEO images={images} product={product} />
      <ProductInfo
        reviewRef={reviewBtnRef}
        questionRef={questionBtnRef}
        product={product}
        cart={cart}
        wishlist={wishlist}
      />
      <Suspense fallback={<Loading />}>
        <Recomendation product={product} />
        <ReveiwsAndQuastions
          product={product}
          reviewRef={reviewBtnRef}
          questionRef={questionBtnRef}
        />
      </Suspense>
    </>
  ) : (
    <LoadingWrapper>
      <Loading />
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
`;

ProductInfoPage.PageLayout = StoreLayout;
export default ProductInfoPage;
