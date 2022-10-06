import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { devices } from 'components/store/lib/Devices';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { useAppSelector } from 'redux/hooks';
import { TGlobalState } from 'redux/types';
import styled from 'styled-components';
import { Category, CategoryInTree } from 'swagger/services';
import CloseSVG from '../../../../../assets/close_black.svg';
import { PopupDisplay } from '../../constants';
import { handleMenuState } from '../../helpers';

type Props = {
  isOpened: boolean;
  display: string;
  setSelectedCategory: Dispatch<SetStateAction<CategoryInTree | undefined>>;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  setDisplay: Dispatch<SetStateAction<PopupDisplay>>;
  menuNode: any;
};

const FilterModal: React.FC<Props> = ({
  isOpened,
  display,
  setSelectedCategory,
  setIsOpened,
  setDisplay,
  menuNode,
}) => {
  const { categories } = useAppSelector<TGlobalState>((state) => state.global);

  const handleSelect = (category: CategoryInTree) => () => {
    setSelectedCategory(category);
    setIsOpened(false);
    setTimeout(() => setDisplay(PopupDisplay.None), 150);
  };

  return (
    <AnimatePresence>
      <PopupWrapper style={{ display: display }}>
        <Content
          initial="init"
          ref={menuNode}
          animate={isOpened ? 'animate' : 'exit'}
          custom={0.2}
          variants={variants.fadInSlideUp}
          id="filter-content"
        >
          <motion.button
            custom={1.1}
            whileTap="tap"
            whileHover="hover"
            variants={variants.grow}
            onClick={handleMenuState(setIsOpened, setDisplay)}
          >
            <CloseSVG />
          </motion.button>
          <ContentInner>
            {categories.map((category, index: any) => {
              return (
                <motion.li
                  initial="init"
                  animate={isOpened ? 'animate' : 'exit'}
                  custom={index * 0.15}
                  variants={variants.fadInSlideUp}
                  key={index}
                  onClick={handleSelect(category)}
                >
                  <span className="catalog-icon">
                    <img
                      src={`/api/images/${category.image}`}
                      alt={category.name}
                    />
                  </span>

                  <span className="catalog-name">{category.name}</span>
                </motion.li>
              );
            })}
          </ContentInner>
        </Content>
      </PopupWrapper>
    </AnimatePresence>
  );
};

const PopupWrapper = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${color.boxShadowBtn};
  position: absolute;
  display: flex;
  flex-directio: row;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Content = styled(motion.div)`
  padding: 30px;
  background-color: ${color.textPrimary};
  border-radius: 25px;
  margin-top: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  button {
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  @media ${devices.mobileL} {
    width: 485px;
    min-height: 340px;
    padding: 0;
    button {
      top: -50px;
      right: 0px;
      background-color: ${color.textPrimary};
      border-radius: 50%;
      cursor: pointer;
      width: 45px;
      height: 45px;
    }
  }
`;

const ContentInner = styled.ul`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;

  li {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    padding: 5px 5px 5px 0;
    .catalog-icon {
      width: 25px;
      height: 25px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .catalog-name {
      white-space: nowrap;
    }
    &:hover {
      color: ${color.hover};
    }
  }
  @media ${devices.mobileL} {
    width: 85%;
    height: 95%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
  }
`;

export default FilterModal;
