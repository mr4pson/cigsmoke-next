import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import Cart from '../../../assets/added_to_cart.svg';

type Props = {
  isInCart: boolean;
  onClick: () => void;
};

const AddToCart: React.FC<Props> = ({ isInCart, onClick }) => {
  return (
    <CartBtn
      whileHover="hover"
      whileTap="tap"
      variants={variants.boxShadow}
      onClick={onClick}
    >
      <AnimatePresence>
        <motion.span
          key="cart-text"
          animate={isInCart ? 'exit' : 'animate'}
          variants={variants.fadeOutSlideOut}
          style={{ position: 'absolute', top: '6px', left: '12px' }}
        >
          В корзину
        </motion.span>
        <motion.span
          key="cart-icon"
          animate={isInCart ? 'animate' : 'exit'}
          variants={variants.fadeInSlideIn}
          style={{ position: 'absolute', top: '6px', left: '32px' }}
        >
          <Cart />
        </motion.span>
      </AnimatePresence>
    </CartBtn>
  );
};

const CartBtn = styled(motion.button)`
  width: 90px;
  height: 35px;
  background: ${color.btnPrimary};
  color: ${color.textPrimary};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  span {
    display: flex;
  }
`;

export default AddToCart;
