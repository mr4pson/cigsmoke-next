import color from 'components/store/lib/ui.colors';
import variants from 'components/store/lib/variants';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { Category } from 'swagger/services';
import Filter from '../../../../../assets/filter.svg';
import { handleCartBtnClick } from '../HeaderCart/helpers';
import { Path } from '../paths';

type Props = {
  selected: Category | undefined;
  setSelected: any;
  setIsOpened: any;
  setDisplay: any;
};

const FilterBtn: React.FC<Props> = ({
  selected,
  setSelected,
  setIsOpened,
  setDisplay,
}) => {
  const handleResetSelected = () => {
    setSelected(undefined);
  };

  const getShortedCategoryName = (categoryName: string): string => {
    return `${categoryName?.slice(0, 5)}..`;
  };

  return (
    <AnimatePresence>
      {selected ? (
        <FilterSelected
          id="filter-btn"
          key="filter-selected"
          initial="init"
          animate="animate"
          exit="exit"
          variants={variants.fadeInSlideIn}
          color={selected != '' ? color.btnPrimary : ''}
          onClick={(e) => e.preventDefault()}
        >
          {getShortedCategoryName(selected?.name!)}
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
              animate={{ rotate: selected ? 45 : 0 }}
              transition={{ delay: 0.1 }}
            />
            <Path
              d="M5.5 7.40295L20.5 7.40295"
              animate={{ rotate: selected ? -45 : 0 }}
              transition={{ delay: 0.1 }}
            />
          </svg>
        </FilterSelected>
      ) : (
        <Button
          id="filter-btn"
          key="filter-icon"
          initial="init"
          animate="animate"
          exit="exit"
          variants={variants.fadeOutSlideOut}
          onClick={handleCartBtnClick(setIsOpened, setDisplay)}
        >
          <span>
            <Filter />
          </span>
        </Button>
      )}
    </AnimatePresence>
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
`;

const Button = styled(motion.button)`
  cursor: pointer;
  position: absolute;
  top: 13px;
  left: 5px;
  z-index: 1;
  height: 22px;
  width: 35px;
`;

export { FilterBtn };
