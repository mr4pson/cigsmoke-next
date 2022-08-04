import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styled from 'styled-components';
import { OrderProduct, Product } from 'swagger/services';
import CloseSVG from '../../../../../assets/close_black.svg';
import ItemCounter from '../../../../../ui-kit/ItemCounter';

type Props = {
  item: OrderProduct;
  onRemove: (product: Product) => void;
  onCountChange: (counter: number, product: Product) => void;
};

const CartItem: React.FC<Props> = ({ item, onRemove, onCountChange }) => {
  const { name, price, images } = item.product!;
  const imageList = images ? images.split(',') : [];

  const handleRemoveClick = (product: Product) => () => {
    onRemove(product);
  };

  return (
    <Link href="/">
      <a>
        <Item>
          <motion.img
            whileHover="hover"
            whileTap="tap"
            custom={1.05}
            variants={variants.grow}
            src={`/api/images/${imageList[0]}`}
          />
          <ItemDetails>
            <h4>{name}</h4>
            <ItemDetialDivider>
              <h3>{price}₽</h3>
              <ItemCounter
                qty={item.qty!}
                product={item.product!}
                onCountChange={onCountChange}
              />
            </ItemDetialDivider>
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
      </a>
    </Link>
  );
};

const Item = styled.li`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  img {
    width: 80px;
    height: 80px;
    min-width: 70px;
  }
  button {
    justify-self: flex-end;
    align-self: flex-start;
    width: 30px;
    height: 30px;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  h4 {
    font-size: 0.8rem;
    font-weight: 400;
    margin: 0;
  }
  h3 {
    font-size: 1.3rem;
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

export default CartItem;
