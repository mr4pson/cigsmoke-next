import { devices } from 'components/store/lib/Devices';
import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Category, CategoryInTree } from 'swagger/services';
import Filter from '../../../../../assets/filter.svg';
import { PopupDisplay } from '../../constants';
import { handleMenuState } from '../../helpers';
import { Path } from '../paths';

type Props = {
  selectedCategory: CategoryInTree | undefined;
  setSelectedCategory: Dispatch<SetStateAction<CategoryInTree | undefined>>;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  setDisplay: Dispatch<SetStateAction<PopupDisplay>>;
  btnNode: any;
};

const FilterBtn: React.FC<Props> = ({
  selectedCategory,
  setSelectedCategory,
  setIsOpened,
  setDisplay,
  btnNode,
}) => {
  const handleResetSelected = () => {
    setSelectedCategory(undefined);
  };

  const getShortedCategoryName = (categoryName: string): string => {
    return `${categoryName?.slice(0, 5)}..`;
  };

  return (
    <>
      <FilterSelected
        id="filter-btn"
        animate={selectedCategory ? 'animate' : 'init'}
        variants={variants.fadeInSlideIn}
        color={selectedCategory ? color.btnPrimary : ''}
        onClick={(e) => e.preventDefault()}
      >
        {getShortedCategoryName(selectedCategory?.name!)}
        <svg
          style={{ cursor: 'pointer' }}
          width="20"
          height="14"
          viewBox="0 0 21 15"
          stroke="white"
          onClick={handleResetSelected}
        >
          <Path
            d="M5.5 7.40295L20.5 7.40295"
            animate={{ rotate: selectedCategory ? 45 : 0 }}
            transition={{ delay: 0.1 }}
          />
          <Path
            d="M5.5 7.40295L20.5 7.40295"
            animate={{ rotate: selectedCategory ? -45 : 0 }}
            transition={{ delay: 0.1 }}
          />
        </svg>
      </FilterSelected>
      <Button
        ref={btnNode}
        id="filter-btn"
        animate={!selectedCategory ? 'animate' : 'init'}
        variants={variants.fadeOutSlideOut}
        onClick={(e) => {
          e.preventDefault();
          handleMenuState(setIsOpened, setDisplay)();
        }}
      >
        <span>
          <Filter />
        </span>
      </Button>
    </>
  );
};

const FilterSelected = styled(motion.button)`
  width: 90px;
  height: 30px;
  position: absolute;
  top: 8px;
  left: 5px;
  z-index: 1;
  font-size: 0.8rem;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  color: ${color.textPrimary};
  background: ${(props) => props.color || 'transparent'};
  z-index: 200;
`;

const Button = styled(motion.button)`
  cursor: pointer;
  position: absolute;
  top: 13px;
  left: 5px;
  z-index: 200;
  height: 22px;
  width: 35px;

  @media ${devices.mobileL} {
    top: 11px;
  }
`;

export { FilterBtn };
