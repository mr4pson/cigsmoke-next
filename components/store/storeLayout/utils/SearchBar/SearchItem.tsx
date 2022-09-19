import { getProductVariantsImages } from 'common/helpers/getProductVariantsImages.helper';
import variants from 'components/store/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch } from 'redux/hooks';
import styled from 'styled-components';
import { Product } from 'swagger/services';
import ArrowSVG from '../../../../../assets/arrow.svg';
import { handleSearchItemClick } from './helpers';

type Props = {
  product: Product;
  index: number;
};

const SearchItem: React.FC<Props> = ({ product, index }) => {
  const dispatch = useAppDispatch();
  const images = getProductVariantsImages(product?.productVariants);

  return (
    <Link href={`/product/${product.url}`}>
      <motion.a
        custom={1.05}
        whileHover="hover"
        whileTap="tap"
        variants={variants.grow}
      >
        <Item
          custom={index * 0.2}
          initial="init"
          animate="animate"
          exit="exit"
          variants={variants.fadInSlideUp}
          onClick={handleSearchItemClick(dispatch)}
        >
          <ItemDividerY>
            <ItemWrapperY>
              <img src={`/api/images/${images[0]}`} />
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
      </motion.a>
    </Link>
  );
};

const Item = styled(motion.li)`
  width: 100%;
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
  img {
    width: 60px;
    object-fit: contain;
  }
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
