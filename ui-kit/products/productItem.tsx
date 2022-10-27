import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import { formatNumber } from 'common/helpers/number.helper';
import { devices } from 'components/store/lib/Devices';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styled from 'styled-components';
import { Product } from 'swagger/services';
import AddToCart from '../../components/home-page/bestsellers/cartBtn';
import Slider from './slider';
import { handleHistory } from './helpers';
import { useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';
import { Role } from 'common/enums/roles.enum';
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
  const images = getProductVariantsImages(product.productVariants);
  const { price, oldPrice, wholeSalePrice } = product.productVariants![0]
    ? product.productVariants![0]
    : ({} as any);
  const { user } = useAppSelector<TAuthState>((state) => state.auth);
  return (
    <ItemContainer
      custom={custom}
      initial="init"
      whileInView="animate"
      viewport={{ once: true }}
      variants={variants.fadInSlideUp}
    >
      <ItemWrapper>
        <Slider
          product={product}
          images={images}
          url={product.url}
          isInWishlist={isInWishlist}
          onWishBtnClick={onWishBtnClick}
        />
        <Link href={`/product/${product.url}`}>
          <a onClick={() => handleHistory(product.id)}>
            <span>{product.name}</span>
            <PriceWrapper>
              <span
                style={{
                  fontSize: '1rem',
                  fontWeight: '800',
                }}
              >
                {user?.role === Role.SuperUser
                  ? formatNumber(wholeSalePrice)
                  : formatNumber(price)}
                ₽
              </span>
              {oldPrice ? (
                <span
                  style={{
                    textDecoration: 'line-through',
                    textDecorationColor: color.hover,
                    textDecorationThickness: '1.5px',
                    color: '#A4A4A4',
                  }}
                >
                  {formatNumber(oldPrice)}₽
                </span>
              ) : (
                <></>
              )}
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

  @media ${devices.laptopS} {
    width: 220px;
  }

  @media ${devices.mobileL} {
    width: 100%;
    min-width: 300px;
  }
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
