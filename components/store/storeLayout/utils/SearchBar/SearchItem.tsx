import variants from 'components/store/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import styled from 'styled-components';
import { Product } from 'swagger/services';
import ArrowSVG from '../../../../../assets/arrow.svg';
import Image from 'next/image';

type Props = {
  product: Product;
  index: number;
};

const SearchItem: React.FC<Props> = ({ product, index }) => {
  const images = product.images ? product.images?.split(',') : [];

  return (
    <Link href="/">
      <motion.a
        custom={1.05}
        whileHover="hover"
        whileTap="tap"
        variants={variants.grow}
      >
        <AnimatePresence>
          <Item
            custom={index * 0.2}
            initial="init"
            animate="animate"
            exit="exit"
            variants={variants.fadInSlideUp}
          >
            <ItemDividerY>
              <ItemWrapperY>
                <Image
                  src={`/api/images/${images[0]}`}
                  width="60"
                  height="60"
                />
                <ItemDividerX>
                  <span>{product.name}</span>
                  <span>
                    {product.category?.name}/{product.category?.parent?.name}
                  </span>
                </ItemDividerX>
              </ItemWrapperY>
              <span>
                <ArrowSVG />
              </span>
            </ItemDividerY>
          </Item>
        </AnimatePresence>
      </motion.a>
    </Link>
  );
};

const Item = styled(motion.li)`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const ItemWrapperY = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const ItemDividerY = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ItemDividerX = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export default SearchItem;
