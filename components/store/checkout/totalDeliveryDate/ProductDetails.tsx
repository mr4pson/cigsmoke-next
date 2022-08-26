import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from '../../lib/ui.colors';
import variants from '../../lib/variants';
import { Wrapper } from './common';
import { getFormatedDate } from './helpers';
import { TCartState } from 'redux/types';
import { useAppSelector } from 'redux/hooks';
import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';

const ProductDetails = () => {
  const { cart } = useAppSelector<TCartState>((state) => state.cart);

  return (
    <Wrapper style={{ gap: '20px' }}>
      <ProudctHeaderWrapper
        custom={0.1}
        initial="init"
        whileInView="animate"
        viewport={{ once: true }}
        variants={variants.fadInSlideUp}
      >
        <h3>Доставка курьером {getFormatedDate(new Date())}</h3>
        <span>
          Склад Тренды 2022 (Московская обл.) • {cart?.orderProducts?.length}{' '}
          товар(ов) • 300 гр
        </span>
      </ProudctHeaderWrapper>
      <ProductWrapper
        custom={0.2}
        initial="init"
        whileInView="animate"
        viewport={{ once: true }}
        variants={variants.fadInSlideUp}
      >
        {cart?.orderProducts?.map((orderProduct) => {
          const { price } = orderProduct?.productVariant!;

          const images = getProductVariantsImages(
            orderProduct.product?.productVariants,
          );
          return (
            <Product>
              <ProductImageWrapper>
                <ProductImage
                  src={`/api/images/${images ? images[0] : ''}`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = '/assets/images/img_error.png';
                  }}
                />
              </ProductImageWrapper>
              <div>
                {orderProduct.product?.name} <b>— {price} ₽</b>
              </div>
            </Product>
          );
        })}
      </ProductWrapper>
    </Wrapper>
  );
};

const ProudctHeaderWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 5px;

  h3 {
    font-size: 1.2rem;
    font-weight: 800;
  }
  span {
    color: ${color.textSecondary};
  }
`;

const ProductWrapper = styled(motion.div)`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 10px;
  width: 150px;

  div {
    text-align: center;
  }
`;

const ProductImageWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: fit-content;
`;
// TODO: featurs will be adde for picking the date of delivery

export default ProductDetails;
