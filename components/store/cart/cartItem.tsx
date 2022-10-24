import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styled from 'styled-components';
import { OrderProduct, Product } from 'swagger/services';
import FilterCheckbox from 'ui-kit/FilterCheckbox';
import { FilterCheckboxSize } from 'ui-kit/FilterCheckbox/types';
import ItemCounter from 'ui-kit/ItemCounter';
import CloseSVG from '../../../assets/close_black.svg';
import { devices } from '../lib/Devices';
import { Rating } from '@mui/material';
import { useAppSelector } from 'redux/hooks';
import { TAuthState } from 'redux/types';
import { Role } from 'common/enums/roles.enum';
type Props = {
  item: OrderProduct;
  selected?: boolean;
  onRemove: (product: Product) => void;
  onCountChange: (counter: number, product: Product) => void;
  onSelect: (item: OrderProduct) => void;
};

const CartItem: React.FC<Props> = ({
  item,
  selected,
  onRemove,
  onCountChange,
  onSelect,
}) => {
  const { name, url } = item.product!;

  const curVariant = item.productVariant
    ? item.productVariant
    : item.product?.productVariants![0]
    ? item.product?.productVariants![0]
    : ({} as any);

  const images = getProductVariantsImages(item.product?.productVariants);

  const handleRemoveClick = (product: Product) => () => {
    onRemove(product);
  };

  const handleSelectCheck = () => {
    onSelect(item);
  };
  const { user } = useAppSelector<TAuthState>((state) => state.auth);

  return (
    <Item>
      <FilterCheckbox
        checked={selected}
        size={FilterCheckboxSize.Big}
        onChange={handleSelectCheck}
      />
      <Link href={`/product/${url}`}>
        <ImageWrapper>
          <motion.img
            whileHover="hover"
            whileTap="tap"
            custom={1.05}
            variants={variants.grow}
            src={`/api/images/${images[0]}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = '/assets/images/img_error.png';
            }}
          />
        </ImageWrapper>
      </Link>
      <ItemDetails>
        <h4>{name}</h4>
        <ItemDetailDivider>
          <h3>
            {user?.role === Role.SuperUser
              ? curVariant.wholeSalePrice
              : curVariant.price}
            ₽
          </h3>
          <ItemCounter
            qty={item.qty!}
            inputStyle={{
              width: '65px',
              height: '45px',
              background: '#C4C4C4',
              border: 'none',
            }}
            product={item.product!}
            onCountChange={onCountChange}
          />
        </ItemDetailDivider>
        <RateWrapper>
          <Rating value={item.product?.rating?.avg} size="medium" readOnly />
        </RateWrapper>
        <ReviewsNumber>{item.product?.reviews?.length} отзывов</ReviewsNumber>
      </ItemDetails>
      <motion.button
        custom={1.1}
        whileTap="tap"
        whileHover="hover"
        variants={variants.grow}
        onClick={handleRemoveClick(item.product!)}
      >
        <CloseSVG />
      </motion.button>
    </Item>
  );
};

const Item = styled.li`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 15px;
  gap: 15px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    min-width: 70px;
    object-fit: contain;
  }
  button {
    justify-self: flex-end;
    align-self: flex-start;
    width: 30px;
    height: 30px;
  }

  > button {
    position: absolute;
    right: 3px;
  }
`;

const ImageWrapper = styled.div`
  width: 220px;
  height: 246px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 30px;
  padding: 25px;
  @media ${devices.mobileL} {
    margin-right: 0;
    min-width: 140px;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  h4 {
    font-size: 16px;
    font-weight: 400;
    margin: 0;
  }

  h3 {
    font-size: 16px;
    font-weight: 700;
    margin: 0;
  }
`;

const ItemDetailDivider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media ${devices.mobileL} {
    flex-direction: column;
    align-items: baseline;
  }
`;

const RateWrapper = styled.div`
  display: flex;
  gap: 7px;
  margin-top: 15px;
`;

const ReviewsNumber = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

export default CartItem;
