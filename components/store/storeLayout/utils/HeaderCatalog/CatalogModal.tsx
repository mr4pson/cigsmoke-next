import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import variants from 'components/store/lib/variants';
import color from 'components/store/lib/ui.colors';
import Arrow from '../../../../../assets/arrow.svg';
import { PopupDisplay } from '../../constants';
import { handleMenuState } from '../../helpers';
import { TGlobalState } from 'redux/types';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { CategoryInTree } from 'swagger/services';
import { fetchBrands } from 'redux/slicers/store/globalSlicer';
import { devices } from 'components/store/lib/Devices';
import {
  handleBrandClick,
  handleCategoryHover,
  handleSubCategoryHover,
} from './helpers';
// TODO: remove this package :react-detect-click-outside
interface props {
  font_size?: string;
  font_wight?: string;
  padding?: string;
  bg_color?: string;
}

type Props = {
  display: PopupDisplay;
  isOpened: boolean;
  menuNode: any;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  setDisplay: Dispatch<SetStateAction<PopupDisplay>>;
};
const CatalogModal: React.FC<Props> = ({
  display,
  isOpened,
  setIsOpened,
  setDisplay,
  menuNode,
}) => {
  const dispatch = useAppDispatch();
  const [curCategory, setCurCategory] = useState<CategoryInTree>();
  const [curSubCategory, setCurSubCategory] = useState<CategoryInTree>();
  const { categories, brands } = useAppSelector<TGlobalState>(
    (state) => state.global,
  );

  useEffect(() => {
    dispatch(fetchBrands({ parent: curCategory?.url }));
  }, [curCategory]);

  return (
    <PopupWrapper
      id="category-wrapper"
      ref={menuNode}
      style={{ display: display }}
      animate={isOpened ? 'open' : 'close'}
      variants={variants.fadeInReveal}
    >
      <WrapperGrid>
        <WrapperMenu padding="0" bg_color={color.bgProduct}>
          {categories.map((category, index) => {
            return (
              <Link key={index} href={`/catalog?categories=${category.url}`}>
                <a>
                  <AnimatePresence>
                    <RowFlex
                      key={index}
                      custom={index * 0.2}
                      initial={false}
                      animate={isOpened ? 'animate' : 'exit'}
                      variants={variants.fadInSlideUp}
                      font_size="1rem"
                      font_wight="600"
                      padding="15px 20px"
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 1 }}
                      onClick={handleMenuState(setIsOpened, setDisplay)}
                      onHoverStart={handleCategoryHover(
                        category,
                        setCurCategory,
                      )}
                    >
                      <Image
                        src={`/api/images/${category.image}`}
                        width="20"
                        height="20"
                      />
                      <span id="main-category">{category.name}</span>
                      <span>
                        <Arrow />
                      </span>
                    </RowFlex>
                  </AnimatePresence>
                </a>
              </Link>
            );
          })}
        </WrapperMenu>
        <WrapperMenu padding="20px 10px" bg_color={color.textPrimary}>
          {curCategory?.children!.map((subCategory, index) => {
            return (
              <Link
                key={index}
                href={`/catalog?categories=${curCategory.url}&subCategories=${subCategory.url}`}
              >
                <a>
                  <AnimatePresence>
                    <RowFlex
                      key={index}
                      custom={index * 0.4}
                      initial={false}
                      animate={isOpened ? 'animate' : 'exit'}
                      variants={variants.fadInSlideUp}
                      font_size="0.875rem"
                      font_wight="400"
                      padding="10px"
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 1 }}
                      onClick={handleMenuState(setIsOpened, setDisplay)}
                      onHoverStart={handleSubCategoryHover(
                        subCategory,
                        dispatch,
                        setCurSubCategory,
                      )}
                    >
                      <span>{subCategory.name}</span>
                    </RowFlex>
                  </AnimatePresence>
                </a>
              </Link>
            );
          })}
        </WrapperMenu>
        <WrapperBrands>
          {brands.map((brand, index) => {
            return (
              <Link
                key={index}
                href={`/catalog?categories=${curCategory?.url}&subCategories=${curSubCategory?.url}&brands=${brand.url}`}
              >
                <a>
                  <AnimatePresence>
                    <motion.a
                      key={index}
                      custom={index * 0.1}
                      initial={false}
                      animate={isOpened ? 'animate' : 'exit'}
                      variants={variants.fadInSlideUp}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 1 }}
                    >
                      <li>
                        <BrandImage
                          onClick={handleBrandClick(setIsOpened, setDisplay)}
                          style={{
                            backgroundImage: `url(/api/images/${brand.image})`,
                          }}
                        />
                      </li>
                    </motion.a>
                  </AnimatePresence>
                </a>
              </Link>
            );
          })}
        </WrapperBrands>
      </WrapperGrid>
    </PopupWrapper>
  );
};

const PopupWrapper = styled(motion.div)`
  position: absolute;
  top: 120px;
  left: 0;
  width: 100%;
  height: 400px;
  background-color: ${color.textPrimary};
  box-shadow: 0 0 2px 6px ${color.boxShadow};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media ${devices.laptopS} {
    height: calc(100vh - 121px);
  }
`;

const WrapperGrid = styled.nav`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr) 2fr;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 35px;

  @media ${devices.laptopS} {
    display: flex;
    gap: unset;
    flex-direction: column;
  }
`;

const WrapperMenu = styled.ul`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${(p: props) => p.bg_color};
  padding: ${(p: props) => p.padding};
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 10px;
  }
  a {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  @media ${devices.laptopS} {
    overflow-y: unset;
    overflow-x: unset;
  }
`;

const RowFlex = styled(motion.li)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(p: props) => p.padding};
  span {
    font-size: ${(p: props) => p.font_size};
    font-weight: ${(p: props) => p.font_wight};
  }

  &:hover {
    color: ${color.hover};
    background-color: ${color.textPrimary};
  }
  #main-category {
    width: 100%;
    padding: 0 0 0 15px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const WrapperBrands = styled.ul`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: flex-start;
  padding: 20px 0;
  overflow-y: scroll;
  row-gap: 25px;
  a {
    display: flex;
    flex-directio: row;
    justify-content: center;
    align-items: center;
    img {
      width: 190px;
      height: auto;
      border-radius: 15px;
    }
  }
`;

const BrandImage = styled.div`
  width: 190px;
  height: 95px;
  border-radius: 15px;
  background-size: cover;
  background-position: center;
`;

export default CatalogModal;
