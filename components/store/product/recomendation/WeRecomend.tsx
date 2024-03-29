import { useEffect, useState } from 'react';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { ArrowBtns, ArrowSpan } from 'ui-kit/ArrowBtns';
import { paginateHandler } from 'components/store/storeLayout/helpers';
import { ProductFlex, ContentWrapper, BtnsWrapper } from './common';
import { HeaderWrapper } from '../common';
import { Product, ProductService } from 'swagger/services';
import ArrowWhite from '../../../../assets/arrow_white.svg';

const WeRecomend = ({ product }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const response = (await ProductService.getProducts({
        limit: 8,
        parent: product?.category.parent?.url,
      })) as unknown as { rows: Product[]; length: number };

      setProducts(response.rows.filter((item) => item.id != product.id));
    })();
  }, []);
  const [
    setRefType,
    widthOrHeightRef,
    widthOrHeight,
    slideTo,
    paginate,
    setSlideAmount,
  ] = paginateHandler();

  useEffect(() => {
    setRefType('width');
    setSlideAmount(200);
  }, []);
  return (
    <ContentWrapper>
      <HeaderWrapper
        custom={0.2}
        initial="init"
        whileInView="animate"
        viewport={{ once: true }}
        variants={variants.fadInSlideUp}
      >
        <h3>Рекомендуем также</h3>
      </HeaderWrapper>
      <ProductFlex
        width={widthOrHeight}
        widthRef={widthOrHeightRef}
        slideTo={slideTo}
        products={products}
      />
      <BtnsWrapper>
        <ArrowBtns
          whileHover="hover"
          whileTap="tap"
          custom={1.2}
          bgcolor={color.btnPrimary}
          boxshadow={color.boxShadowBtn}
          variants={variants.grow}
          position="abolute"
          onClick={() => paginate(1)}
        >
          <ArrowSpan rotate="180">
            <ArrowWhite />
          </ArrowSpan>
        </ArrowBtns>
        <ArrowBtns
          whileHover="hover"
          whileTap="tap"
          custom={1.2}
          bgcolor={color.btnPrimary}
          boxshadow={color.boxShadowBtn}
          variants={variants.grow}
          position="abolute"
          onClick={() => paginate(-1)}
        >
          <ArrowSpan rotate="0">
            <ArrowWhite />
          </ArrowSpan>
        </ArrowBtns>
      </BtnsWrapper>
    </ContentWrapper>
  );
};

export default WeRecomend;
