import { generateArrayOfNumbers } from 'common/helpers/array.helper';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styled from 'styled-components';
import { OrderProduct, Product } from 'swagger/services';
import FilterCheckbox from 'ui-kit/FilterCheckbox';
import { FilterCheckboxSize } from 'ui-kit/FilterCheckbox/types';
import ItemCounter from 'ui-kit/ItemCounter';
import CloseSVG from '../../../assets/close_black.svg';
import StarSVG from '../../../assets/star.svg';

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
  const { name, price, images } = item.product!;
  const imageList = images ? JSON.parse(images) : [];

  const handleRemoveClick = (product: Product) => () => {
    onRemove(product);
  };

  const handleSelectCheck = () => {
    onSelect(item);
  };

  return (
    <Item>
      <FilterCheckbox
        checked={selected}
        size={FilterCheckboxSize.Big}
        onChange={handleSelectCheck}
      />
      <ImageWrapper>
        <motion.img
          whileHover="hover"
          whileTap="tap"
          custom={1.05}
          variants={variants.grow}
          src={imageList[0]}
        />
      </ImageWrapper>
      <ItemDetails>
        <h4>{name}</h4>
        <ItemDetialDivider>
          <h3>{price}₽</h3>
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
        </ItemDetialDivider>
        <RateWrapper>
          {generateArrayOfNumbers(5).map((num) => (
            <StarSVG color="#FED42D" />
          ))}
        </RateWrapper>
        <ReviewsNumber>56 отзывов</ReviewsNumber>
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

  img {
    width: 100px;
    height: 100px;
    min-width: 70px;
  }
  button {
    justify-self: flex-end;
    align-self: flex-start;
    width: 30px;
    height: 30px;
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

const ItemDetialDivider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
