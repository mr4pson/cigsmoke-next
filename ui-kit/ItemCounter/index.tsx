import { useState } from 'react';
import styled from 'styled-components';
import color from 'components/store/lib/ui.colors';
import { motion } from 'framer-motion';
import variants from 'components/store/lib/variants';
import {
  decreaseCounter,
  increaseCounter,
} from '../../components/store/storeLayout/utils/HeaderCart/helpers';
import { Product } from 'swagger/services';

type Props = {
  qty: number;
  product: Product;
  inputStyle?: Object;
  onCountChange: (counter: number, product: Product) => void;
};
const ItemCounter: React.FC<Props> = ({
  qty,
  product,
  inputStyle,
  onCountChange,
}) => {
  const [itemCounter, setItemCounter] = useState(qty);

  return (
    <ItemCounterWrapper onClick={(e) => e.preventDefault()}>
      <motion.button
        whileHover="hover"
        whileTap="tap"
        variants={variants.boxShadow}
        onClick={decreaseCounter(product, setItemCounter, onCountChange)}
      >
        -
      </motion.button>
      <input
        style={inputStyle}
        readOnly
        value={itemCounter}
        type="number"
        min={1}
      />
      <motion.button
        whileHover="hover"
        whileTap="tap"
        variants={variants.boxShadow}
        onClick={increaseCounter(product, setItemCounter, onCountChange)}
      >
        +
      </motion.button>
    </ItemCounterWrapper>
  );
};

const ItemCounterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;

  button {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-color: ${color.btnPrimary};
    color: ${color.textPrimary};
    align-self: center !important;
  }

  input {
    width: 34px;
    height: 30px;
    text-align: center;
    border-radius: 5px;
    padding: 0 8px;
    border: 1px solid ${color.btnPrimary};
    background-color: ${color.textPrimary};
    color: ${color.btnPrimary};
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export default ItemCounter;
