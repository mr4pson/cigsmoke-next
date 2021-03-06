import { formatNumber } from 'common/helpers/number.helper';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styled from 'styled-components';
import { Product } from 'swagger/services';
import AddToCart from './bestsellers/cartBtn';
import Slider from './slider';

type Props = {
  product: Product;
  custom: number;
  isInCart: boolean;
  isInWishlist: boolean;
  onCartBtnClick: () => void;
  onWishBtnClick: (prodcut: Product) => void;
};

const ProductItem: React.FC<Props> = ({
  product,
  custom,
  isInCart,
  isInWishlist,
  onCartBtnClick,
  onWishBtnClick,
}) => {
  const images = product.images ? JSON.parse(product.images) : [];

  return (
    <ItemContainer
      custom={custom}
      initial="init"
      whileInView="animate"
      exit="exit"
      viewport={{ once: true }}
      variants={variants.fadInSlideUp}
    >
      <ItemWrapper>
        <Slider
          product={product}
          images={images}
          url={product.id}
          isInWishlist={isInWishlist}
          onWishBtnClick={onWishBtnClick}
        />
        <Link href={`/${product.id}`}>
          <a>
            <span>{product.name}</span>
            <PriceWrapper>
              <span
                style={{
                  fontSize: '1rem',
                  fontWeight: '800',
                }}
              >
                {formatNumber(product.price)}₽
              </span>
              <span
                style={{
                  textDecoration: 'line-through',
                  textDecorationColor: color.hover,
                  textDecorationThickness: '1.5px',
                  color: '#A4A4A4',
                }}
              >
                {formatNumber(product.oldPrice)}₽
              </span>
            </PriceWrapper>
          </a>
        </Link>
        <AddToCart isInCart={isInCart} onClick={onCartBtnClick} />
      </ItemWrapper>
    </ItemContainer>
  );
};

const ItemContainer = styled(motion.li)`
  width: 270px;
  height: 465px;
`;

const ItemWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  a {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 5px;

    span {
      color: ${color.btnPrimary};
      font-size: 0.875rem;
      text-align: start;
      font-weight: 500;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
`;

const PriceWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 10px;
`;

export default ProductItem;
