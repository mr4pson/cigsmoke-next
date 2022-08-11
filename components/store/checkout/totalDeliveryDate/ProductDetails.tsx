import styled from 'styled-components';
import { motion } from 'framer-motion';
import color from '../../lib/ui.colors';
import variants from '../../lib/variants';
import { Wrapper } from './common';

const ProductDetails = () => {
  return (
    <Wrapper style={{ gap: '20px' }}>
      <ProudctHeaderWrapper
        custom={0.1}
        initial="init"
        whileInView="animate"
        viewport={{ once: true }}
        variants={variants.fadInSlideUp}
      >
        <h3>Доставка курьером 10 августа</h3>
        <span>Склад Тренды 2022 (Московская обл.) • 1 товар • 300 гр</span>
      </ProudctHeaderWrapper>
      <ProductImageWrapper
        custom={0.2}
        initial="init"
        whileInView="animate"
        viewport={{ once: true }}
        variants={variants.fadInSlideUp}
      >
        <img src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" />
        <span>{`300`}₽</span>
      </ProductImageWrapper>
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

const ProductImageWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 10px;
  img {
    width: 100px;
  }
  span {
    color: ${color.textSecondary};
  }
`;

// TODO: featurs will be adde for picking the date of delivery

export default ProductDetails;
